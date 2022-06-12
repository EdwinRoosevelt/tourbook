import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { Modal, Box, Group, Button, Divider, TextInput, PasswordInput } from "@mantine/core";
// import firebase from 'firebase';

import googleIcon from "../../public/google.png";

import { asyncLoadUser } from "../../store/UserSlice";
import { ShieldLock } from "tabler-icons-react";

function LoginModal({ loginModalState, setIsLoginModalOpen }) {
  const dispatch = useDispatch();
  const router = useRouter();

  function signIn() {
    dispatch(asyncLoadUser());
    setIsLoginModalOpen(false);
    router.push("/");
  }

  return (
    <Modal
      centered
      opened={loginModalState}
      onClose={() => setIsLoginModalOpen(false)}
      overlayOpacity={0.55}
      transition="fade"
      transitionDuration={600}
    >
      <div className="flex gap-2 text-primary justify-content-center">
        <ShieldLock size={50} strokeWidth={1} />
        <div className="fs-2 mb-5"> Sign In</div>
      </div>

      <Box sx={{ maxWidth: 340 }} mx="auto">
        {/* <form onSubmit={form.onSubmit((values) => console.log(values))}> */}
        <TextInput
          disabled
          required
          label="Email"
          placeholder="your@email.com"
          // {...form.getInputProps("email")}
        />

        <PasswordInput
          mt="sm"
          disabled
          label="Password"
          placeholder="Password"
          // {...form.getInputProps("password")}
        />

        <Group position="right" mt="md">
          <button type="button" className="btn btn-primary btn-sm px-3 py-2 disabled">
            Login{" "}
          </button>
        </Group>
        {/* </form> */}
      </Box>

      <Divider my="xl" label="or" labelPosition="center" />

      <div className="flex justify-content-center mb-4">
        <button
          className="btn btn-outline-primary flex align-items-center gap-2"
          type="button"
          onClick={signIn}
        >
          <Image src={googleIcon} height="20rem" width="20rem"></Image>
          <p>Sign in with Google</p>
        </button>
      </div>
    </Modal>
  );
}

export default LoginModal;
