import React from "react";
import { FileUpload } from "../../components/form-controls/file-upload";
import { Container, Title } from "./styles";

const Profile: React.FC = () => {
  return (
    <Container>
      <Title>Profile</Title>
      <FileUpload />
    </Container>
  );
};

export default Profile;
