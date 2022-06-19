import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {CREATE_POST_TYPED_DATA} from "../../api/post/create-post"
import { omit, splitSignature } from "../../lib/apollo/helpers"
import { useSignTypedData, useContractWrite, useAccount } from "wagmi";
import { LENS_HUB_PROXY_ADDRESS } from '../../Config'
import { uploadIpfs } from "../../lib/ipfs";

import LENS_ABI from '../../abis/Lens-Hub.json'
function CreatePosts({currentUser}) {
 const [content, setContent] = useState("");
const [name, setName] = useState("");
 const [isPosting, setIsPosting] = useState(false);
 const [image, setImage] = useState("");
const [imageMimeType, setImageMimeType] = useState("");
const [externalUrl, setExternalUrl] = useState("")
 const { signTypedDataAsync } = useSignTypedData();
 const { writeAsync } = useContractWrite(
   {
     addressOrName: LENS_HUB_PROXY_ADDRESS,
     contractInterface: LENS_ABI,
   },
   "postWithSig"
 );

 const [createPostTypedData, {}] = useMutation(CREATE_POST_TYPED_DATA, {
   onCompleted({ createPostTypedData }) {
     if (!createPostTypedData) console.log("createPost is null");
     const { typedData } = createPostTypedData;
     const {
       profileId,
       contentURI,
       collectModule,
       collectModuleInitData,
       referenceModule,
       referenceModuleInitData,
     } = typedData?.value;

     signTypedDataAsync({
       domain: omit(typedData?.domain, "__typename"),
       types: omit(typedData?.types, "__typename"),
       value: omit(typedData?.value, "__typename"),
     }).then((res) => {
       const { v, r, s } = splitSignature(res);
       const postARGS = {
         profileId,
         contentURI,
         collectModule,
         collectModuleInitData,
         referenceModule,
         referenceModuleInitData,
         sig: {
           v,
           r,
           s,
           deadline: typedData.value.deadline,
         },
       };
       writeAsync({ args: postARGS }).then((res) => {
         res.wait(1).then(() => {
           setIsPosting(false);
           setContent("");
         });
       });
     });
   },
   onError(error) {
     console.log(error);
     setIsPosting(false);
   },
 });
 const handlePost = async () => {
   if (!currentUser) return;
   setIsPosting(true);

   const data = {
     description: content,

     name,
     content,
   externalUrl,
   image,
   imageMimeType,
     media: [],
   };
   const result = await uploadIpfs({ data });
   console.log(result);
   createPostTypedData({
     variables: {
       request: {
         profileId: currentUser.id,
         contentURI: "https://ipfs.infura.io/ipfs/" + result.path,
         collectModule: {
           revertCollectModule: true,
         },
         referenceModule: {
           followerOnlyReferenceModule: false,
         },
       },
     },
   });
 };

   if (isPosting) {
     return (
       <div >
         Posting...
       </div>
     );
   }
  return (
    <div>
      <div class="bold-line"></div>
      <div class="container">
        <div class="window">
          <div class="overlay"></div>
          <div class="content">
            <div class="welcome">Hello There!</div>
            <div class="subtitle">
              Welcome to Mind Tales!!!
            </div>
            <form onSubmit={handlePost}>
              <div class="input-fields">
                <textarea
                  id="content"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Content"
                  class="input-line full-width"
                ></textarea>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Username"
                  class="input-line full-width"
                ></input>
                <input
                  id="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Enter image url"
                  class="input-line full-width"
                ></input>
                <input
                  id="imageType"
                  type="text"
                  value={imageMimeType}
                  onChange={(e) => setImageMimeType(e.target.value)}
                  placeholder="Format:image/type(Example:image/jpeg)"
                  class="input-line full-width"
                ></input>
                <input
                  id="external"
                  type="url"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="Enter external url"
                  class="input-line full-width"
                ></input>
              </div>
              <div>
                <button class="ghost-round full-width">Create Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePosts;
