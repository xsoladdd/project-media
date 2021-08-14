import { QueryResult } from "@apollo/client";
import React, { Profiler } from "react";
import { MeQuery, useMeQuery } from "../../generated/graphql";
import { usePrivateRoute } from "../../hooks/usePrivateRoute";
import Layout from "../../layout/Layout";
import { Exact, Maybe, User } from "../../types";
import { CustomApolloError } from "../../types/apollo";
import ProfileSetup from "../profile-setup-modal/ProfileSetup";
import Post from "./media-feed/Post";
// import {} from '../../types/apollo'

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  const dummyUser: Maybe<User> = {
    email: "dummyEmail@gmail.com",
    id: "x",
    mobile_number: "09776281917",
    profile: {
      birthday: "12-24-1993",
      display_image:
        "http://localhost:5001/public/e9146108-a78b-4c97-b0d7-af03e21a74b3.jpg",
      first_name: "Root",
      // id:""
      last_name: "Canal",
      nickname: "Nick",
      id: "x",
    },
    username: "fourteenxd",
  };

  return (
    <>
      <Layout>
        <h1>Media Feed</h1>
        {/* Post */}
        <div className="">
          {/* Post item */}
          <div className="grid grid-cols-1 gap-6 my-6 px-4 md:px-6 lg:px-8">
            {" "}
            <Post description={` I love you`} user={dummyUser} />
            <Post
              user={dummyUser}
              image="https://images.unsplash.com/photo-1586398710270-760041494553?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80"
              description={` Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
              ullam velit non consectetur commodi distinctio nobis facilis
              corporis. Reprehenderit repellendus, dolorem vel doloribus rem
              corrupti voluptatem nemo rerum unde odio. Perspiciatis provident
              architecto dolor asperiores. Aut voluptas quo omnis eos eaque`}
            />
            <Post
              user={dummyUser}
              description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              excepturi error rem cupiditate delectus aliquid a quisquam? Quas
              laudantium aspernatur, eligendi animi earum ipsa enim. Atque error
              officiis consectetur? Exercitationem! Velit soluta eos laboriosam
              quibusdam cumque nemo reiciendis tempore architecto, voluptate
              expedita accusantium vero illum sit mollitia doloribus earum quasi
              dolor, vitae fugit assumenda animi saepe maiores. Vero, alias
              beatae. Alias dignissimos non mollitia dolore, aspernatur
              distinctio! Explicabo cupiditate ipsum rerum sequi et laborum illo
              expedita, iste animi doloremque nulla architecto suscipit,
              blanditiis repudiandae itaque aperiam sit repellendus? Esse,
              animi. Nam cumque autem reiciendis quis odio voluptate, esse quasi
              beatae ex ut ullam recusandae laborum repellendus assumenda
              incidunt deleniti impedit consequuntur sequi expedita
              exercitationem maiores animi. Mollitia ipsa esse rem? Fugit
              numquam ipsum, quae soluta sit totam atque perferendis nihil
              veniam temporibus magni quasi maiores facilis? Quam delectus dolor
              est iure molestiae deleniti, aliquam accusantium quidem saepe  `}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};
