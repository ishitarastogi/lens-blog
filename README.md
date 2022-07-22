# Mind Tales 🧚
Mind Tales is a Blogging platform build on top of the Lens protocol.
We used GraphQl API provided by Lens Protcol to build Mind Tales. The functionalities included in our project are mentioned below:

## 1. Creating Profile 🙍
The Profile allows us to create profile. We receive ProfileNFT on creating profile. As required by lens user should be authenticated 
before creating profile so Login with lens is required before creating profile.

<img width="1394" alt="Screenshot 2022-06-19 at 9 22 39 PM" src="https://user-images.githubusercontent.com/46647968/180417492-8734150f-171f-4e1d-88c0-26bdf3c62902.png">

## 2. Creating Post ✍️
Post can be created by following Lens protocol Metadata standards. It uses withSig method to do a post from a profile on Lens Protocol. This module is also protected by Authentication. All the data uploading using post are stored on **IPFS**

<img width="1397" alt="Screenshot 2022-06-19 at 9 22 27 PM" src="https://user-images.githubusercontent.com/46647968/180420324-d32a233f-0d63-4ff4-8c52-050ccc4bfbde.png">

## 3. Explore publication 📋
This query returns a list of publications based on the top collected or top comments. It shows the blogs created by the users who own profile on our platform.

<img width="1424" alt="Screenshot 2022-06-19 at 9 22 01 PM" src="https://user-images.githubusercontent.com/46647968/180420831-7e85a180-f244-47e5-a7c1-1c4b317054d2.png">

## 4. Explore Individual Profile 👻
This query showed the individual's profile. The publication created by then and their followers, following and pictures.

<img width="1273" alt="Screenshot 2022-06-19 at 9 22 50 PM" src="https://user-images.githubusercontent.com/46647968/180421273-c8321ad5-d837-4260-ad8d-8d608766461f.png">
