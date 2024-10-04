import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from '../components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useEffect, useRef } from "react";
import axiox from "./axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
// import Googlelogin from "./googleAuth";
import { ModeToggle } from '../components/ui/mode-toggle';

export function Auth() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const socket = io();
  const navigate = useNavigate();

  // Sending login info to backend also emiting socket
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const body = {
        email: email.current.value,
        password: password.current.value,
      };
      console.log(body)
      await axiox.post("/api/v1/login", body).then(() => {
        const socket = io(axiox);
        socket.emit("login", { body, message: "user logged in !!" });
        navigate("Home/profileSetup");
      });
    } catch (error) {
      console.log("Error while login", error);
    }
  }
  // Creating a new use
  async function handleSignUp(e) {
    e.preventDefault();

    try {
      const body = {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      await axiox.post("/api/v1/signup", body).then(() => {
        socket.emit("signup", { body, message: "new user created" });
        navigate("Home/profileSetup");
      });
    } catch (error) {
      console.log("Error while signup ", error);
    }
  }
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 bg-background">
      <div>render</div>
    <ModeToggle className="absolute top-4 right-4 md:top-6 md:right-6" />
    <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[40%] 2xl:max-w-[30%]">
      <Tabs defaultValue="Login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="Login" className="text-sm sm:text-base">Login</TabsTrigger>
          <TabsTrigger value="SignUp" className="text-sm sm:text-base">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <Card className="border-0 shadow-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Hello! We're glad to see you again. Log in to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="login-email"
                    placeholder="Enter email"
                    required
                    type="email"
                    className="w-full px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="login-password"
                    placeholder="Enter password"
                    required
                    type="password"
                    className="w-full px-3 py-2 text-sm"
                  />
                </div>
                <Button type="submit" className="w-full text-sm sm:text-base">
                  Login
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-sm sm:text-base">
                Guest Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="SignUp">
          <Card className="border-0 shadow-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Welcome! Create an account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSignUp}>
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-medium">Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="Enter name"
                    required
                    type="text"
                    className="w-full px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="signup-email"
                    placeholder="Enter email"
                    required
                    type="email"
                    className="w-full px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="signup-password"
                    placeholder="Enter password"
                    required
                    type="password"
                    className="w-full px-3 py-2 text-sm"
                  />
                </div>
                <Button type="submit" className="w-full text-sm sm:text-base">
                  Sign Up
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-sm sm:text-base">
                Guest Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </div>
  );
}
