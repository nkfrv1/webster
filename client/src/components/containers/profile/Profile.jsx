import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material/';
import { useNavigate } from 'react-router';

import {
	useGetImagesQuery,
	useGetImageQuery,
} from '../../../features/image/imageApiSlice';
import {
	setImageData,
	setEditorState,
} from '../../../features/image/imageSlice';
import useAuth from '../../../hooks/useAuth';

import ShareModal from './ShareModal';
import DeleteModal from './DeleteModal';
import '../../../scss/profile.scss';

function CarouselItem({ index, item, currentindex, id }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [openShareModal, setOpenShareModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const { data, isLoading } = useGetImageQuery(id);
	let content = null;
	console.log(data);

	const handleEdit = () => {
		dispatch(
			setImageData({
				imageSrc: data.source,
				imageName: data.name.split('.')[0],
				imageType: data.name.split('.')[1],
			})
		);
		dispatch(setEditorState(true));
		navigate('/editor');
	};

	if (!isLoading) {
		content = (
			<>
				<ShareModal
					open={openShareModal}
					setOpen={setOpenShareModal}
					imgSrc={data.source}
				/>
				<DeleteModal
					open={openDeleteModal}
					setOpen={setOpenDeleteModal}
					imageId={data._id}
				/>
				<div
					className="carousel-item"
					key={index}
					style={{ transform: `translate(-${currentindex * 100}%)` }}
				>
					<div
						className="carousel-item-background"
						style={{
							// backgroundImage: `url(${item.src})`,
							backgroundImage: `url(${data.source})`,
							backgroundSize: 'cover',
							filter: `blur(${currentindex === index ? '7px' : '7px'})`,
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
						}}
					/>
					<img
						className="carousel-item-image"
						// src={item.src}
						src={data.source}
						style={{
							objectFit: 'contain',
							position: 'relative',
							zIndex: 2,
							maxWidth: '100%',
							maxHeight: '100%',
						}}
					/>
					<div className="carousel-item-toolbar">
						<div onClick={handleEdit}>
							<p>Edit</p>
						</div>
						<div onClick={() => setOpenShareModal(true)}>
							<p>Share</p>
						</div>
						<div onClick={() => setOpenDeleteModal(true)}>
							<p>Delete</p>
						</div>
					</div>
				</div>
			</>
		);
	} else if (isLoading) {
		content = <CircularProgress />;
	}
	return content;
}

function Carousel() {
	const { id } = useAuth();
	// const id = '646bcef97635da8db37561a7';
	const [imagesIds, setImagesIds] = useState([]);
	let data = [
		{ src: 'https://picsum.photos/id/345/1920/1080/' },
		{ src: 'https://picsum.photos/id/212/1920/1080' },
		{ src: 'https://picsum.photos/id/37/1920/1080' },
		{ src: 'https://picsum.photos/id/137/1920/1080' },
		{ src: 'https://picsum.photos/id/217/1440/920' },
	];
	const [currentindex, setCurrentindex] = useState(0);

	const { data: allImages, isSuccess } = useGetImagesQuery();

	useEffect(() => {
		if (isSuccess) {
			allImages.map((item) => {
				if (item.userId === id) {
					setImagesIds((prev) => [...prev, item]);
				}
			});
		}
	}, [isSuccess, allImages]);

	const handleDotClick = (index) => {
		setCurrentindex(index);
	};

	return (
		<div className="carousel-container">
			<div className="dots-wr">
				{imagesIds.map((item, index) => {
					return (
						<div
							className={`dot ${currentindex === index ? 'active' : ''}`}
							onClick={() => handleDotClick(index)}
							key={item._id}
						/>
					);
				})}
			</div>
			{imagesIds.length === 0 ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
					}}
				>
					<h3>No works here</h3>
				</div>
			) : (
				<div className="carousel-wr">
					{imagesIds.map((item, index) => {
						return (
							<CarouselItem
								key={item._id}
								id={item._id}
								item={item}
								index={index}
								currentindex={currentindex}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}

function UserProfile() {
	const { name, surname, email } = useAuth();

	return (
		<div className="profile-wr">
			<div className="profile-data">
				<div className="profile-photo-wr">
					<div className="profile-photo-container">
						<img src="https://picsum.photos/id/912/300/300"></img>
					</div>
					<div className="profile-photo-circles red"></div>
					<div className="profile-photo-circles blue"></div>
				</div>
				<div className="profile-username-wr">
					<p className="profile-username">
						{name} {surname}
					</p>
					<p className="profile-username">{email}</p>
				</div>
			</div>
			<div className="images-wr">
				<div style={{ display: 'flex', flexDirection: 'column', width: '65%' }}>
					<p>Last works</p>
					<div className="profile-last-images">
						<Carousel />
					</div>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
					<p>Last filter</p>
					<div className="profile-last-filter"></div>
				</div>
			</div>
		</div>
	);
}

export default UserProfile;
