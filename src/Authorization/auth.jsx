import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import axiox from "./axios"
import {io} from "socket.io-client"
import { useNavigate } from "react-router-dom";
import Googlelogin from "./googleAuth";


export function Auth() {
  const name = useRef() 
  const email = useRef()
  const password = useRef()
  const socket = io();
  const navigate = useNavigate()

console.log(axiox)
  // Sending login info to backend also emiting socket 
 async function handleLogin (e) { 
      e.preventDefault();
        
      try{
          const body = {
            email:email.current.value,
            password:password.current.value,
          }
        await axiox.post("/api/users/login",body).then(()=>{
          const socket = io(axiox);
      socket.emit("login", { body, message: "user logged in !!" });
          navigate("Home")
        })

      } catch(error){
        console.log("Error while login", error)
      }
  }
  // Creating a new use 
  async function handleSignUp ( e ) {
            e.preventDefault()

            try{
              const body = {
                name:name.current.value,
                email:email.current.value,
                password:password.current.value,
              }
              await axiox.post("/api/v1/signup",body).then(()=>{
                socket.emit("signup",{body, message: "new user created"})
                navigate("Home")
              })
            } catch(error){
              console.log("Error while signup " , error)
            }
  }
  return (
    <div className="sm:w-dvw h-dvh flex justify-center items-center bg-ba ">
      <div className="sm: w-[400px] ">
        <Tabs defaultValue="Login">
          <TabsList>
            <TabsTrigger value="Login">Login</TabsTrigger>
            <TabsTrigger value="SignUp">SignUp</TabsTrigger>
          </TabsList>
          <TabsContent value="Login">
            <Card >
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Hello! We're glad to see you again. Log in to continue.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-3" onSubmit={handleLogin}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    ref={email}
                    placeholder="Enter email"
                    required
                    type="email"
                    id="email"
                  />
                  <Label htmlFor="pass">Password</Label>
                  <Input
                  ref={password}
                    placeholder="Enter password"required type="password"id="pass"></Input>
                  <Button type="submit" className="font-semibold">
                    Submit
                  </Button>
                </form>
              </CardContent>
                <CardFooter className="flex justify-evenly" >
                  <Googlelogin/>
                  <Button>Guest Account</Button>
                </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="SignUp">
          <Card  >
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Hello! We're glad to see you again. Log in to continue.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-3" onSubmit={handleSignUp}>
                  <Label htmlfor="name">Name</Label>
                  <Input placeholder="Enter name" required type="text" ref={name}/>
                  <Label htmlfor="email">Email</Label>
                  <Input
                    placeholder="Enter email"
                    required
                    type="email"
                    id="email"
                    ref={email}
                  />
                  <Label htmlfor="pass">Password</Label>
                  <Input
                    placeholder="Enter password"
                    required
                    type="password"
                    id="pass"
                    ref={password}
                  ></Input>
                  <Button type="submit" className="font-semibold">
                    Submit
                  </Button>
                </form>
              </CardContent>
                <CardFooter className="flex justify-evenly" >
                <Googlelogin/>
                  <Button>Guest Account</Button>
                </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
