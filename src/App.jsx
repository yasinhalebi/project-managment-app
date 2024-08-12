import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected"
import SelectedProject from "./components/SelectedProject";
import { useState } from "react";


function App() {
  const[projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text){
    setProjectsState(prevState=>{
      const taskId = Math.random();
      const newTask ={
        text : text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return{
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTask(id){
    setProjectsState(prevState=>{
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task)=>task.id !== id),
      };
    });
  }

  function handleDeleteProject(){
    setProjectsState(prevState=>{
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project)=>project.id != prevState.selectedProjectId),
      };
    });
  }

  function handleSelectProject(id){
    setProjectsState(prevState=>{
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject(){
    setProjectsState(prevState=>{
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  function handleCancelAddProject(){
    setProjectsState(prevState=>{
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }
    
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)
  let content = (<SelectedProject tasks={projectsState.tasks} onDeleteTask={handleDeleteTask} onAddTask={handleAddTask} project={selectedProject} onDelete={handleDeleteProject}/>);
  

  function handleAddProject(projectData){
    setProjectsState(prevState=>{
      const newProject ={
        ...projectData,
        id: Math.random(),
      };
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }
  if(projectsState.selectedProjectId===null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  }else if(projectsState.selectedProjectId===undefined){
    content=<NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onSelectProject={handleSelectProject} onStartAddProject={handleStartAddProject} projects={projectsState.projects} selectedProjectId={projectsState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
