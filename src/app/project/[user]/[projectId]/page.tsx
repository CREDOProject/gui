import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProjectByPath = () => {
	return (
		<div>
			<h1>{"{"}project_name{"}"}</h1>
			<p>Build Base: ubuntu:24.04</p>
			<Input>
			</Input>
			<Button>
				Add dependency
			</Button>
		</div>
	)
}

export default ProjectByPath;
