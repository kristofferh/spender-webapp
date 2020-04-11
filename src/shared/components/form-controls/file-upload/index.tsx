import { FieldProps } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import FormWrapper from "shared/components/form-controls/_form-wrapper";
import {
  Container,
  Label,
  Preview,
  PreviewImg,
  PreviewText,
  Prompt
} from "./styles";

interface Props extends FieldProps {
  attributes?: object;
  className?: string;
  id?: string;
  label?: React.ReactNode;
  showPlaceholder?: boolean;
  placeholder?: string;
  pattern?: string;
  onChange?: (value: string) => void;
  accept?: string;
  multiple?: boolean;
  preview?: (files: any) => React.ReactNode;
  prompt?: () => React.ReactNode;
  reject?: () => React.ReactNode;
}

let urls = new WeakMap();

let blobUrl = (blob: any) => {
  if (urls.has(blob)) {
    return urls.get(blob);
  } else {
    let url = URL.createObjectURL(blob);
    urls.set(blob, url);
    return url;
  }
};

export const DefaultPreview: React.FC<{ files: any }> = ({ files = [] }) => {
  return files.map((file: any, index: number) => (
    <Preview key={index}>
      <PreviewText>{file.name}</PreviewText>
      <Prompt>Not the right file? Try again.</Prompt>
    </Preview>
  ));
};

export const ImagePreview: React.FC<{ files: any }> = ({ files = [] }) => {
  useEffect(
    () => () => {
      // Cleanup old files.
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return files.map((file: any, index: number) => {
    return (
      <Preview key={index}>
        <PreviewImg src={blobUrl(file)} size={80} />
        <Prompt>Not the right file? Try again.</Prompt>
      </Preview>
    );
  });
};

const DefaultPrompt: React.FC = () => {
  return <Label>Add files</Label>;
};

export const FileUpload: React.FC<Props> = ({
  field,
  accept,
  multiple,
  preview = (files: any) => <ImagePreview files={files} />,
  prompt = () => <DefaultPrompt />
}) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  //const [rejectedFiles, setRejectedFiles] = useState([]);
  const onDrop = useCallback((accepted, rejected) => {
    console.log("accepted files", accepted);
    console.log("rejected files", rejected);

    setAcceptedFiles(accepted);
    //setRejectedFiles(rejected);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept,
    multiple,
    onDrop
  });

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...field} {...getInputProps()} />
      {acceptedFiles.length ? preview(acceptedFiles) : prompt()}
    </Container>
  );
};

export default FormWrapper(FileUpload);
