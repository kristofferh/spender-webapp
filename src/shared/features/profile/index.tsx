import { withFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileForm, {
  Props as ProfileFormProps
} from "shared/components/profile-form";
import { fetchProfile, updateProfile } from "shared/data/profile/actions";
import { Container, Title } from "./styles";

export type FormValues = {
  avatar?: string;
  firstName?: string;
  lastName?: string;
};

type FormProps = {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<any>;
};

const ProfileWrapper = withFormik<FormProps & ProfileFormProps, FormValues>({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => {
    return initialValues;
  },
  handleSubmit: async (values, { setStatus, props: { onSubmit } }) => {
    try {
      await onSubmit(values);
    } catch {
      setStatus("Something went weird.");
    }
  }
})(ProfileForm);

const Profile: React.FC = () => {
  const { profile } = useSelector((state: any) => state.profile);
  console.log(profile);
  const dispatch = useDispatch();
  const handleSubmit = async (values: FormValues) => {
    dispatch(updateProfile(values));
  };

  const handleDrop = (files: any) => {
    console.log("handleDrop", files);
  };

  useEffect(() => {
    console.log("dispatch");
    dispatch(fetchProfile());
  }, []);

  return (
    <Container>
      <Title>Profile</Title>
      <ProfileWrapper
        onDrop={handleDrop}
        onSubmit={handleSubmit}
        initialValues={profile}
      />
    </Container>
  );
};

export default Profile;
