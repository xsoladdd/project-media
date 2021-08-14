import React from "react";
import { useTestFileUploadMutation } from "../generated/graphql";

interface testProps {}

const Test: React.FC<testProps> = ({}) => {
  const [fileUpload] = useTestFileUploadMutation();
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
              fileUpload({
                variables: {
                  testFileUploadInput: {
                    file: files[0],
                  },
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
