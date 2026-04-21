import {
  TextInput,
  PasswordInput,
  Paper,
  Button,
  Title,
  Text,
  Container,
  FileButton,
  Avatar,
  Box,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { User, Mail, Lock, Camera, X } from "lucide-react";
import "@mantine/core/styles.css";

import { motion } from "motion/react";
import { Link } from "react-router";

// Parent animation (controls children stagger)
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Child animation
const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.6 },
  },
};

export function Register() {
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = { ...data, photo: file };
    console.log(formData);
  };

  return (
    <div className="">
      <Container size={520}>
        {/* 🔥 Parent Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Paper
              withBorder
              shadow="lg"
              p={20}
              radius="lg"
              className="backdrop-blur-md bg-white/90"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="text-center mb-6">
                <Title order={2} className="font-bold text-gray-800">
                  Create Account
                </Title>
                <Text size="sm" c="dimmed" mt={5}>
                  Start your journey with us 🚀
                </Text>
              </motion.div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                variants={itemVariants}
              >
                {/* Avatar */}
                <motion.div variants={itemVariants}>
                  <Box className="flex flex-col items-center mb-3">
                    <Avatar
                      src={file ? URL.createObjectURL(file) : null}
                      size={90}
                      radius="xl"
                      className="mb-3 border-4 border-blue-500 shadow-md"
                    />

                    <FileButton
                      onChange={setFile}
                      accept="image/png,image/jpeg"
                    >
                      {(props) => (
                        <Button
                          {...props}
                          variant="light"
                          size="xs"
                          radius="xl"
                          leftSection={<Camera size={14} />}
                        >
                          Upload Photo
                        </Button>
                      )}
                    </FileButton>
                  </Box>
                </motion.div>

                {/* Inputs */}
                <motion.div variants={itemVariants}>
                  <TextInput
                    label="Full Name"
                    placeholder="John Doe"
                    mt="sm"
                    size="md"
                    radius="md"
                    leftSection={<User size={16} />}
                    {...register("name", { required: "Name is required" })}
                    error={errors.name?.message}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <TextInput
                    label="Email"
                    placeholder="hello@gmail.com"
                    mt="md"
                    size="md"
                    radius="md"
                    leftSection={<Mail size={16} />}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/,
                        message: "Invalid email",
                      },
                    })}
                    error={errors.email?.message}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <PasswordInput
                    label="Password"
                    placeholder="••••••••"
                    mt="md"
                    size="md"
                    radius="md"
                    leftSection={<Lock size={16} />}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                    })}
                    error={errors.password?.message}
                  />
                </motion.div>

                {/* Button */}
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    fullWidth
                    mt="xl"
                    size="md"
                    radius="xl"
                    className="transition-all duration-300 hover:scale-[1.02]"
                  >
                    Register
                  </Button>
                </motion.div>

                {/* Footer */}
                <motion.div variants={itemVariants}>
                  <Text size="sm" ta="center" mt="md" c="dimmed">
                    Already have an account?{" "}
                    <Link
                      to={"/auth/login"}
                      className="text-blue-600 cursor-pointer hover:underline"
                    >
                      Login
                    </Link>
                  </Text>
                </motion.div>
              </motion.form>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
