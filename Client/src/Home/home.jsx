
import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {ScrollArea} from "../components/ui/scroll-area"
import {Separator} from "../components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { ModeToggle } from "../components/ui/mode-toggle";
export function Home () {
    return (
        <div className="flex h-screen bg-background text-foreground">
         <ModeToggle/>
          <aside className="w-64 border-r border-border">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Contacts</h2>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                
                {[1, 2, 3, 4, 5].map((contact) => (
                  <div key={contact} className="flex items-center space-x-4 py-2 hover:bg-accent rounded-lg px-2 cursor-pointer">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=Contact${contact}`} />
                      <AvatarFallback>C{contact}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Contact {contact}</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </aside>
    
          
          <main className="flex-1 flex flex-col">
          
            <header className="border-b border-border p-4">
              <h1 className="text-xl font-semibold">Chat with John Doe</h1>
            </header>
    
          
            <ScrollArea className="flex-1 p-4">
              
              {[1, 2, 3, 4, 5].map((message) => (
                <div key={message} className={`flex ${message % 2 === 0 ? 'justify-end' : 'justify-start'} mb-4`}>
                  <div className={`max-w-[70%] p-3 rounded-lg ${message % 2 === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                    <p className="text-sm">This is a sample message {message}</p>
                    <p className="text-xs text-muted-foreground mt-1">12:34 PM</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
    
            
            <div className="border-t border-border p-4">
              <form className="flex space-x-2">
                <Input className="flex-1" placeholder="Type a message..." />
                <Button type="submit">Send</Button>
              </form>
            </div>
          </main>
        </div>
      );
}