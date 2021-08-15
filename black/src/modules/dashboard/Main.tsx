import { QueryResult } from "@apollo/client";
import Link from "next/link";
import React, { Profiler, useState } from "react";
import {
  FetchPostQuery,
  FetchPostQueryResult,
  Post as PostType,
  useFetchPostQuery,
} from "../../generated/graphql";
import { usePrivateRoute } from "../../hooks/usePrivateRoute";
import Layout from "../../layout/Layout";
import { Exact, Maybe, User } from "../../types";
import { CustomApolloError } from "../../types/apollo";
import Button from "../../ui/Button";
import ProfileSetup from "../profile-setup-modal/ProfileSetup";
import NewPost from "./media-feed/NewPost";
import Post from "./media-feed/Post";
// import {} from '../../types/apollo'

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  const [offset, setOffset] = useState(0);
  const fetchGap = 5;
  const [data, setData] = useState<PostType[]>([]);

  const { loading } = useFetchPostQuery({
    variables: {
      fetchPostInput: {
        offset,
      },
    },
    onCompleted: ({ fetchPost }) => {
      // console.log();
      const { posts } = fetchPost;
      if (posts) {
        // console.log(fetchPost.posts);
        setData([...data, ...posts]);
      }
    },
  });
  if (loading) {
    <h1>Loading</h1>;
  }

  return (
    <>
      <Layout>
        <div className=" flex flex-col   place-content-center place-items-center py-4">
          <h1 className="text-3xl font-semibold uppercase">Media Feed</h1>

          {/* New Post */}
          <div className="pt-5">
            <NewPost />
          </div>
        </div>
        {/* Post */}
        <div className="">
          {/* Post item */}
          <div className="grid grid-cols-1 gap-6 my-6 px-4 md:px-6 lg:px-8">
            {data.map(({ content, user, UpdatedAt }, idx) => {
              return (
                <Post
                  key={idx}
                  description={content}
                  user={user}
                  lastUpdateTime={UpdatedAt}
                />
              );
            })}
            {/* <Post description={` I love you`} user={dummyUser} /> */}
            {/* <Post
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
            /> */}
            <Button onClick={() => setOffset(offset + fetchGap)}>
              Show More
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
};
