import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modal-atom";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import 'bulma/css/bulma.min.css';

import '../fontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { async } from "@firebase/util";
import { db, storage, auth } from "../firebase"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Modal() {
    const [open, SetOpen] = useRecoilState(modalState);
    const filePickerRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const captionRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [selectedSports, setSelectedSports] = useState(null);
    const distanceRef = useRef(null);
    const durationRef = useRef(null);

    const uploadPost = async () => {
        if (loading) return;
        setLoading(true);
        // 1) Create a post and add to firestore 'posts' collection
        // 2) get the post ID for the newly created post
        // 3) upload the image to firebase storage with the post ID
        // 4) get a download URL from fb storage and update the original post with image

        // Add to photos
        const docRef = await addDoc(collection(db, 'photos'), {
            username: auth.currentUser.displayName,
            caption: captionRef.current.value,
            userId: auth.currentUser.uid,
            likes: [],
            comments: {
                displayName: [],
                comment: [],
            },
            // profileImg: auth.currentUser.imageSrc,
            dateCreated: Date.now()
        })
        // Add to fitness
        const userDocRef = await addDoc(collection(db, 'fitness'), {
            userId: auth.currentUser.uid,
            sportsType: selectedSports,
            distance: distanceRef.current.value,
            duration: durationRef.current.value,
            // profileImg: auth.currentUser.imageSrc,
            dateCreated: serverTimestamp()
        })

        // console.log("New doc added with ID", docRef.id);

        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url").then(
            async snapshot => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, 'photos', docRef.id), {
                    imageSrc: downloadURL,
                });
            });

        
        SetOpen(false);
        setLoading(false);
        setSelectedFile(null);
    }

    function uploadPostWrapper(){
        uploadPost().then( _ => {
            window.location.reload(false);
        })
    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fade fixed z-10 inset-0 overflow-y-auto" onClose={SetOpen}>
                <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">{/*&#8203*/}</span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left
                    overflow-hidden shadow-xl transform transition-all sm: my-8 sm: align-middle sm: max-w-sm sm: w-full sm: p-6">
                            <div>
                                <div className="mb-2">
                                    <h1 class="title is-4 mb-6 has-text-centered">
                                        Create Workout Post
                                    </h1>
                                </div>

                                <div className="mt-4">
                                    <div className="mt-2">
                                        <h3
                                        className="text-lg leading-6 font-medium text-gray-900 mb-3"
                                        >
                                            Caption:
                                        </h3>
                                        <textarea
                                            class="border-none focus:ring-0 w-full pl-2"
                                            type="text"
                                            ref={captionRef}
                                            placeholder= "Write a caption"
                                            rows="3"
                                        >
                                        </textarea>
                                        {/* <input
                                            className="border-none focus:ring-0 w-full pl-2"
                                            type="text"
                                            ref={captionRef}
                                            placeholder= "Write a caption"
                                        /> */}
                                    </div>

                                    <div className="mt-2">
                                        <h3
                                        className="text-lg leading-6 font-medium text-gray-900 mb-3"
                                        >
                                            Distance Completed:
                                        </h3>
                                        <input
                                            className="border-none focus:ring-0 w-full pl-2"
                                            type="number"
                                            ref={distanceRef}
                                            placeholder="Enter distance (in miles)"
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <h3
                                        className="text-lg leading-6 font-medium text-gray-900 mb-3"
                                        >
                                            Workout Duration:
                                        </h3>
                                        <input
                                            className="border-none focus:ring-0 w-full pl-2"
                                            type="number"
                                            ref={durationRef}
                                            placeholder="Enter workout duration (in minutes)"
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <h3
                                        className="text-lg leading-6 font-medium text-gray-900 mb-3"
                                        >
                                            Type of Workout:
                                        </h3>
                                        <div class="control" className="mt-3 ml-2">
                                            {/* <label class="radio">
                                                <input type="radio" name="Sports" onClick={() => setSelectedSports("Walking")} />
                                                &nbsp; Walking
                                            </label> */}
                                            <label class="radio">
                                                <input type="radio" name="Sports" onClick={() => setSelectedSports("Jogging")} />
                                                &nbsp; Jogging
                                            </label>
                                            {/* <label class="radio">
                                                <input type="radio" name="Sports" onClick={() => setSelectedSports("Running")} />
                                                &nbsp; Running
                                            </label>
                                            <label class="radio">
                                                <input type="radio" name="Sports" onClick={() => setSelectedSports("Bicycling")} />
                                                &nbsp; Cycling
                                            </label> */}
                                        </div>
                                        <div class="control" className="mt-2 ml-2">
                                            <label class="radio">
                                                <input type="radio" name="Sports" onClick={() => setSelectedSports("Walking")} />
                                                &nbsp; Walking
                                            </label>
                                            {/* <label class="radio">
                                                <input type="radio" name="Sports" onClick={() => setSelectedSports("Jogging")} />
                                                &nbsp; Jogging
                                            </label>
                                            <label class="radio">
                                                <input type="radio" name="Sports" onClick={() => setSelectedSports("Running")} />
                                                &nbsp; Running
                                            </label>
                                            <label class="radio">
                                                <input type="radio" name="Sports" onClick={() => setSelectedSports("Bicycling")} />
                                                &nbsp; Cycling
                                            </label> */}
                                        </div>
                                        <div class="control" className="mt-2 ml-2">
                                            <label class="radio">
                                                <input type="radio" name="Sports" onClick={() => setSelectedSports("Running")} />
                                                &nbsp; Running
                                            </label>
                                            {/* <label class="radio">
                                                <input type="radio" name="Sports" onClick={() => setSelectedSports("Bicycling")} />
                                                &nbsp; Cycling
                                            </label> */}
                                        </div>
                                        <div class="control" className="mt-2 ml-2">
                                            {/* <label class="radio">
                                                <input type="radio" name="Sports" onClick={() => setSelectedSports("Running")} />
                                                &nbsp; Running
                                            </label> */}
                                            <label class="radio">
                                                <input type="radio" name="Sports" onClick={() => setSelectedSports("Bicycling")} />
                                                &nbsp; Cycling
                                            </label>
                                        </div>
                                        
                                    </div>
                                    
                                    <div>
                                        <input
                                            ref={filePickerRef}
                                            type="file"
                                            hidden
                                            onChange={addImageToPost}
                                        />
                                    </div>
                                </div>

                                <Dialog.Title
                                as="h3"
                                className="text-lg leading-6 font-medium text-gray-900 mt-3 mb-3"
                                >
                                    Upload Photo:
                                </Dialog.Title>
                                {selectedFile ? (
                                    <img src={selectedFile}
                                        className="w-full object-contain cursor-pointer"
                                        onClick={() => setSelectedFile(null)}
                                        alt="" />
                                ) : (
                                    <div
                                        onClick={() => filePickerRef.current.click()}
                                        className="mx-auto flex item-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer mb-6"

                                    >
                                        <FontAwesomeIcon icon="fa-solid fa-camera" size="3x" border/>                                        
                                    </div>

                                )}

                                <div class="control" className="mt-5 sm:mt-6 text-center">
                                    <button
                                        disabled={!selectedFile}
                                        class="button is-primary"
                                        onClick={uploadPostWrapper}
                                    >
                                        {loading ? "Uploading..." : "Upload Post"}
                                    </button>
                                </div>

                                {/* <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        disabled={!selectedFile}
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm
                                        px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
                                        focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                                        disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                                        onClick={uploadPost}
                                    >
                                        {loading ? "Uploading..." : "Upload Post"}

                                    </button>
                                </div> */}

                            </div>
                        </div>
                    </Transition.Child>
                </div>

            </Dialog >

        </Transition.Root >
    );
}

export default Modal;