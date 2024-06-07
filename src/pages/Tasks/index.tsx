import { Pagination } from "../../components/Pagination";
import { TaskCard } from "../../components/TaskCard";
import { useQueryTask } from "../../hooks/useQueryTask";
import { Container } from "./styles";

export function Tasks() {
  const {
    data,
    changeLimit,
    page,
    changePage,
    totalPages,
    prevPage,
    nextPage,
  } = useQueryTask();

if(totalPages > 0 && page > totalPages) {
  changePage(totalPages);
}

  return (
    <Container>
      <div className="headPageTasks">
        <h2>Lista</h2>

        <div className="paginationDesktop">
          <Pagination
            page={page}
            step={5}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            changeLimit={changeLimit}
          />
        </div>
      </div>

      <div className="tasksComtainer">
        {data?.length == 0 ? (
          <p className="loading">Sem tarefas para mostrar</p>
        ) : (
          data?.map((task) => {
            return <TaskCard data={task} key={task.id} />;
          })
        )}
      </div>
      <div className="paginationMobile">
          <Pagination
            page={page}
            step={5}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            changeLimit={changeLimit}
          />
        </div>
    </Container>
  );
}
