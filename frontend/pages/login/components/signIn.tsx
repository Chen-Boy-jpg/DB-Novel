import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  Select,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { loginRequest, regiestMember } from "../service/request";
import { useForm } from "react-hook-form";
import { MemberType } from "../type";
import { useRouter } from "next/router";

const SignIn = () => {
  const toast = useToast();
  const router = useRouter();
  const [isRegiest, setIsRegiest] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MemberType>();

  const regiestMutation = useMutation(regiestMember, {
    onSuccess: (res) => {
      toast({
        title: "註冊成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log(res);
    },
    onError: (error) => {
      toast({
        title: "註冊失敗",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const loginMutation = useMutation(loginRequest, {
    onSuccess: (res) => {
      console.log(res);
      router.push("/home");
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "登入失敗",
        description: "帳號或密碼錯誤",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data) => {
    if (isRegiest) regiestMutation.mutate(data);
    else loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        w={"100vw"}
        h={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"#F2ECEC"}
      >
        <Box
          w={"80%"}
          maxW={"1540px"}
          h={"80%"}
          maxH={"1000px"}
          display={"flex"}
          shadow={"lg"}
          borderRadius={"2rem"}
          overflow={"hidden"}
        >
          <Box
            h={"100%"}
            w={"100%"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"space-around"}
            bgColor={"white"}
            color={"#3AB19B"}
            style={{
              backfaceVisibility: "hidden",
              transform: isRegiest ? "translateX(100%)" : "none",
              transition: "transform 0.8s ease-in-out",
            }}
          >
            <Box fontSize={"5rem"} h={"20%"} fontWeight={800}>
              NOVEL
            </Box>
            <FormControl w={"80%"} isInvalid={!!errors.email}>
              <Input
                {...register("email", {
                  required: "This is required",
                })}
                placeholder="email"
                variant={"flushed"}
                fontSize={"1.5rem"}
                bgColor={"#F4F8F7"}
                p={"1rem"}
                letterSpacing={"5px"}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl w={"80%"} isInvalid={!!errors.password}>
              <Input
                {...register("password", {
                  required: "This is required",
                })}
                type="password"
                variant={"flushed"}
                placeholder="Password"
                fontSize={"1.5rem"}
                bgColor={"#F4F8F7"}
                p={"1rem"}
                letterSpacing={"5px"}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            {isRegiest && (
              <>
                <FormControl w={"80%"}>
                  <Input
                    {...register("mName")}
                    variant={"flushed"}
                    placeholder="Name"
                    fontSize={"1.5rem"}
                    bgColor={"#F4F8F7"}
                    p={"1rem"}
                    letterSpacing={"5px"}
                  />
                </FormControl>
                <FormControl w={"80%"}>
                  <Select
                    fontSize={"1.5rem"}
                    bgColor={"#F4F8F7"}
                    onChange={(e) => {
                      setValue("gender", e.target.value);
                    }}
                  >
                    <option value={"-"}>--</option>
                    <option value={"M"}>男</option>
                    <option value={"F"}>女</option>
                  </Select>
                </FormControl>
                <FormControl w={"80%"}>
                  <Input
                    type="date"
                    variant={"flushed"}
                    placeholder="Password"
                    fontSize={"1.5rem"}
                    bgColor={"#F4F8F7"}
                    onChange={(e) => {
                      setValue("birthday", e.target.value);
                    }}
                  />
                </FormControl>
              </>
            )}

            <Button
              type="submit"
              color={"white"}
              bgColor={"#3AB19B"}
              borderRadius={"10rem"}
              w={"50%"}
              h={"5rem"}
              fontSize={"1.5rem"}
              _hover={{
                transform: "scale(1.05)",
              }}
              isLoading={regiestMutation.isLoading || loginMutation.isLoading}
            >
              {isRegiest ? "REGIEST" : "SIGN IN"}
            </Button>
          </Box>

          <Box
            w={"100%"}
            h={"100%"}
            bgColor={"#3AA9AB"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"2rem"}
            style={{
              backfaceVisibility: "hidden",
              transform: isRegiest ? "translateX(-100%)" : "none",
              transition: "transform 0.8s ease-in-out",
            }}
          >
            <Box fontSize={"3rem"} color={"white"} fontWeight={800}>
              Hello, friend
            </Box>
            <Box fontSize={"1rem"} color={"white"} fontWeight={600}>
              Enter your personal information
            </Box>
            <Button
              variant={"outline"}
              fontSize={"1.5rem"}
              color={"white"}
              h={"4rem"}
              w={"10rem"}
              fontWeight={600}
              borderRadius={"10rem"}
              _hover={{
                transform: "scale(1.05)",
                bgColor: "white",
                color: "#3AB19B",
              }}
              onClick={() => {
                setIsRegiest(!isRegiest);
                reset();
              }}
            >
              {isRegiest ? "SIGN IN" : "REGIEST"}
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default SignIn;
