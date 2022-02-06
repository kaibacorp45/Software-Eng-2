import { Timestamp, collection,addDoc } from 'firebase/firestore';
import React, {useState} from 'react';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { storage,db } from '../firebaseConfig';
import { upload } from '@testing-library/user-event/dist/upload';
import { toast, ToastContainer } from 'react-toastify';

export default function AddFruits(){
	const [formData, setFormData] = useState({
		fruitName: "",
		description: "",
		image: "",
		createdAt: Timestamp.now().toDate,
	})
	const [progress, setProgress] = useState(0);
	const handleChange=(e)=>{
		setFormData({...formData,[e.target.name]:e.target.value});

	};

	const handleImageChange=(e)=>{
		setFormData({...formData, image: e.target.files[0]})
	};

	const handlePublish=()=>{
		if(!formData.fruitName || !formData.description || !formData.image){
			alert('Please fill all fields');
			return;
		}

		const storageRef = ref(storage, `/images/${Date.now()}$formData.image.name}`);

		const uploadImage = uploadBytesResumable(storageRef, formData.image)
		uploadImage.on("state_changed",
		(snapshot)=>{
			const progressPercent = Math.Round((snapshot.bytesTransferred / snapshot.totalBytes) *100);
			setProgress(progressPercent);
		},
		(err)=>{
			console.log(err);
		},
		()=>{
			setFormData({
				fruitName: "",
				description: "",
				image: "",

			});
			getDownloadURL(uploadImage.snapshot.ref)
			.then((url)=>{
				const fruitRef = collection(db, "Fruits");
				addDoc(fruitRef,{
					fruitName: formData.fruitName,
					description: formData.description,
					imageUrl: url,
					createdAt: Timestamp.now().toDate(),
				})
				.then(()=>{
					toast("Fruit added successfully", {type: "success"});
					setProgress(0);
				})
				.catch(()=>{
					toast("Error adding Fruit", {type: "error"});
				})
			})
		}
		)
		
	}
	return(

		<div className="border p-3 mt-3 bg-light" style={{position:"fixed"}}>
				<h2>Publish Fruit Fact</h2>
				<label htmlFor="">Fruit Name</label>
				<input type="text" name="fruitName" className="form-control" value={formData.fruitName}
				onChange={(e)=>handleChange(e)}
				/>

				{/*description*/}
					<label htmlFor="">Description</label>
					<textarea name="description" className="form-control" value={formData.description}
					onChange={(e)=>handleChange(e)}
					/> 

				{/*image*/}
					<label htmlFor="">Image</label>
					<input type="file" name="image" accept="image/*" className="form-control"
					onChange={(e)=>handleImageChange(e)}
					/>
		{progress === 0 ? null :(
			<div className="progress">
					<div 
						className="progress-bar progress-bar-striped mt-2" 
						style={{width: `${progress}%`}}>
						{`uploading image ${progress}%`}
					</div>
			</div>
				)}
				<button className="form-control btn-primary mt-2" onClick={handlePublish}>Publish</button>
			</div>
		
			
	)
	
}