import React from "react";
import Button from "../../../ui/Button";
import TextInput from "../../../ui/Form/TextInput";
import TextAreaInput from "../../../ui/Form/TextAreaInput";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  useMeQuery,
  useUpdateProfileMutation,
} from "../../../generated/graphql";
import Loading from "../../../components/Loading/Loading";
import NoUser from "../NoUser";
import { useRouter } from "next/router";

interface EditProfileFormProps {}

const EditProfileForm: React.FC<EditProfileFormProps> = ({}) => {
  const { data, loading, error } = useMeQuery({});
  const { back, push } = useRouter();

  const [updateProfile, { loading: updateProfileLoading }] =
    useUpdateProfileMutation({
      onCompleted: ({ updateProfile }) => {
        if (updateProfile.status === 1) {
          return push(`/u/${data?.me.user?.username}`);
        }
        return;
      },
    });

  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!data?.me.user || data.me.status === 0) {
    return <NoUser />;
  }

  const { profile } = data.me.user;

  return (
    <div className="py-5">
      <h1 className="py-5 font-bold uppercase  text-2xl text-center">
        Edit Profile
      </h1>
      <Formik
        initialValues={{
          firstName: profile?.first_name,
          middleName: profile?.middle_name ? profile?.middle_name : "",
          lastName: profile?.last_name,
          nickname: profile?.nickname ? profile?.nickname : "",
          bio: profile?.bio ? profile?.bio : "",
        }}
        validationSchema={() =>
          Yup.object({
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            lastName: Yup.string()
              .max(20, "Must be 15 characters or less")
              .required("Required"),
            middleName: Yup.string().max(15, "Must be 15 characters or less"),
            nickname: Yup.string().max(10, "Must be 10 characters or less"),
          })
        }
        onSubmit={(values) => {
          if (values.firstName && values.lastName) {
            return updateProfile({
              variables: {
                input: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  bio: values.bio,
                  middleName: values.middleName,
                  nickname: values.nickname,
                },
              },
            });
          }
          return;
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="px-5">
            <div className="flex flex-col md:flex-row">
              <TextInput
                label="First name"
                required
                id="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={errors.firstName}
              />

              <TextInput
                label="Middle name"
                id="middleName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.middleName}
                error={errors.middleName}
              />
              <TextInput
                label="Last name"
                required
                id="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={errors.lastName}
              />
            </div>
            <div className="">
              <TextInput
                id="nickname"
                label="Nickname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nickname}
                error={errors.nickname}
              />
            </div>
            <div className="">
              <TextAreaInput
                label="Bio"
                id="bio"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bio}
                error={errors.bio}
              />
            </div>
            <div className="p-4 flex justify-end gap-2">
              <Button
                variant="gray"
                size="md"
                type="button"
                onClick={() => back()}
              >
                Cancel
              </Button>
              <Button
                size="md"
                variant="green"
                type="submit"
                loading={updateProfileLoading}
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default EditProfileForm;
