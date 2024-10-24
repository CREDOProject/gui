import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Label } from "@radix-ui/react-label";

const HomeNav = () => {
  return (
    <nav>
      <SidebarTrigger />
    </nav>
  )
}
export default function Home() {
  return (
    <>
      <HomeNav />
      <div className="flex flex-col items-center">
        <Card className="max-w-sm w-full">
          <CardHeader>
            <CardTitle>Create a project</CardTitle>
            <CardDescription>Get started with your new CREDO project.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
              </div>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Base Image</Label>
                  <RadioGroup className="grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Ubuntu</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Fedora</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button>Create</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
