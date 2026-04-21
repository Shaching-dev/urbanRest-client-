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

import { User, Mail, Lock, Camera } from "lucide-react";
import "@mantine/core/styles.css";

import { motion } from "motion/react";

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

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = { ...data };
    console.log(formData);
  };

  return (
    <div className="">
      <Container size={520}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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
                Welcome Back!
              </Title>
              <Text size="sm" c="dimmed" mt={5}>
                Please Signin
              </Text>
            </motion.div>

            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput
                label="Email"
                placeholder="hello@gmail.com"
                mt="md"
                size="md"
                radius="md"
                leftSection={<Mail size={16} />}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
                })}
                error={errors.email?.message}
              />

              <PasswordInput
                label="Password"
                placeholder="••••••••"
                mt="md"
                size="md"
                radius="md"
                leftSection={<Lock size={16} />}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                error={errors.password?.message}
              />

              {/* Button */}
              <Button
                type="submit"
                fullWidth
                mt="xl"
                size="md"
                radius="xl"
                className="transition-all duration-300 hover:scale-[1.02]"
              >
                Login
              </Button>

              {/* Footer */}
              <Text size="sm" ta="center" mt="md" c="dimmed">
                Already have an account?{" "}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  Register
                </span>
              </Text>
            </motion.form>
          </Paper>
        </motion.div>
      </Container>
    </div>
  );
}
