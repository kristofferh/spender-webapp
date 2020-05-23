import { FieldProps } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import FormWrapper from "shared/components/form-controls/_form-wrapper";
import { fileUpload } from "shared/utils";
import {
  Container,
  Label,
  Preview,
  PreviewImg,
  PreviewText,
  Prompt,
  Reject
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
  onDrop?: (files: any) => void;
  directUpload?: boolean;
  onUploadStart?: () => void;
  onUploadComplete?: (keys: string[]) => void;
  onUploadError?: () => void;
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

export const DefaultReject: React.FC<{ files: any }> = ({ files = [] }) => {
  return files.map((_: any, index: number) => (
    <Reject key={index}>
      <PreviewText>Oops. It looks we don’t support that file type.</PreviewText>
      <Prompt>Give it another shot. Click here.</Prompt>
    </Reject>
  ));
};

export const ImagePreview: React.FC<{ files: any }> = ({ files = [] }) => {
  useEffect(
    () => () => {
      // Cleanup old files to not have memory leaks.
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
  directUpload = true,
  multiple = false, // TODO: Deal with multiple uploads.
  preview = (files: any) => <ImagePreview files={files} />,
  reject = (files: any) => <DefaultReject files={files} />,
  prompt = () => <DefaultPrompt />,
  onDrop: onDropCallback,
  onUploadStart,
  onUploadComplete
}) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const onDrop = useCallback(async (accepted, rejected) => {
    if (onUploadStart) {
      onUploadStart();
    }

    if (directUpload && accepted.length) {
      const fileuploadKey = await fileUpload(accepted[0]);
      if (onUploadComplete) {
        onUploadComplete(fileuploadKey);
      }
    }

    if (onDropCallback && accepted.length) {
      onDropCallback(accepted);
    }

    setAcceptedFiles(accepted);
    setRejectedFiles(rejected);
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
  const { name, onBlur, onChange } = field;
  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value=""
        {...getInputProps()}
      />
      {acceptedFiles.length
        ? preview(acceptedFiles)
        : rejectedFiles.length
        ? reject(rejectedFiles)
        : prompt()}
    </Container>
  );
};

export default FormWrapper(FileUpload);
