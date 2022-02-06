
import {collection, DocumentReference, onSnapshot, orderBy, query} from "firebase/firestore";
import React, {useState, useEffect} from "react";
import { db } from "../firebaseConfig";

export default function Fruits(){
const [fruits,setFruits] = useState([]);
useEffect(()=>{
	const fruitRef = collection(db,"Fruits");
	const q = query(fruitRef, orderBy("createdAt", "desc"));
	onSnapshot(q,(snapshot)=>{
		const fruits = snapshot.docs.map((doc) =>({
			id: doc.id,
			...doc.data(),

		}));
		setFruits(fruits);
		console.log(fruits)
	},[])
})
	return(
		<div>
			{
				fruits.length === 0 ?(
					<p>No Fruits Found!</p>
				):(
				fruits.map(({id,fruitName, description, imageUrl, createdAt}) =>(
					<div className="border mt-3 p-3 bg-light" key = {id}>
						<div className="row">
							<div className="col-3">
								<img src= {imageUrl} alt='fruitName' style={{height:180,width:180}}/>
							</div>
							<div className="col-9 ps-3">
								<h2>{fruitName}</h2>
								<p>{createdAt.toDate().toDateString()}</p>
								<h4>{description}</h4>
							</div>
						</div>
					</div>
				)))
			}
		</div>
	);
	
}