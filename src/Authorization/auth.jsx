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
import { FcGoogle } from "react-icons/fc";
import { useRef } from "react";
export function Auth() {


  function handleLogin ( ) { 
    const email = useRef()
    const password = useRef()
  }
  function handleSignUp ( ) {
    const name = useRef() 
    const email = useRef()
    const password = useRef()
  }
  return (
    <div className="sm:w-dvw h-dvh flex justify-center items-center ">
      <div className="sm: w-[400px]">
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
                  <Label htmlfor="email">Email</Label>
                  <Input
                    placeholder="Enter email"
                    required
                    type="email"
                    id="email"
                  />
                  <Label htmlfor="pass">Password</Label>
                  <Input
                    placeholder="Enter password"required type="password"id="pass"></Input>
                  <Button type="submit" className="font-semibold">
                    Submit
                  </Button>
                </form>
              </CardContent>
                <CardFooter className="flex justify-evenly" >
                  <Button>
                    <FcGoogle className="text-xl" />
                    Login with Google
                  </Button>
                  <Button>Guest Account</Button>
                </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="SignUp">
          <Card >
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Hello! We're glad to see you again. Log in to continue.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-3" onSubmit={handleSignUp}>
                  <Label htmlfor="name">Name</Label>
                  <Input placeholder="Enter name" required type="text"/>
                  <Label htmlfor="email">Email</Label>
                  <Input
                    placeholder="Enter email"
                    required
                    type="email"
                    id="email"
                  />
                  <Label htmlfor="pass">Password</Label>
                  <Input
                    placeholder="Enter password"
                    required
                    type="password"
                    id="pass"
                  ></Input>
                  <Button type="submit" className="font-semibold">
                    Submit
                  </Button>
                </form>
              </CardContent>
                <CardFooter className="flex justify-evenly" >
                  <Button>
                    <FcGoogle className="text-xl" />
                    Login with Google
                  </Button>
                  <Button>Guest Account</Button>
                </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
