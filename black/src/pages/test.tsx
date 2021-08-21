import React from "react";
import { useUploadProfilePictureMutation } from "../generated/graphql";

// import Loading from "../components/Loading/Loading";

// interface testProps {}

const Test: React.FC<{}> = ({}) => {
  // const [fileUpload] = useTestFileUploadMutation();

  const [uploadProfilePicture] = useUploadProfilePictureMutation();

  return (
    <>
      <h1>Test</h1>

      <div className="">
        <label htmlFor="avatar">Choose a profile picture:</label>

        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              uploadProfilePicture({
                variables: {
                  ProfilePicture: files[0],
                },
              });
            }
          }}
        />
      </div>
    </>
  );
};
export default Test;

// export default Loading;
