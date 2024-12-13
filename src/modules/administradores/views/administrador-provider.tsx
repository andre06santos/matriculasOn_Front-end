import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchData } from "../infrastructure/fetch-data";

export const AdminContext = createContext<any>(undefined);

export const AdminProvider = ({ children }: any) => {
  const [courses, setCourses] = useState<any>([]);
  const [students, setStudents] = useState<any>([]);
  console.log(courses);
  console.log(students);
  const getCourses = useCallback(async () => {
    try {
      const userRequest = {
        endpoint: "/cursos",
      };
      const _courses = await fetchData(userRequest);

      setCourses(_courses);
    } catch (error) {
      console.log("Ocorreu um erro ao tentar mostrar os cursos!");
      console.error((error as Error).message);
    }
  }, []);

  const searchCourse = useCallback(async (name: any) => {
    try {
      const userRequest = {
        endpoint: `/cursos?nome=${name}`,
      };
      const _courses = await fetchData(userRequest);

      setCourses(_courses);

      return _courses;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }, []);

  const addCourse = useCallback(async (newCourse: any) => {
    try {
      const userRequest = {
        endpoint: "/cursos",
        config: {
          method: "POST",
          data: JSON.stringify(newCourse),
        },
      };

      const addedCourse = await fetchData(userRequest);

      setCourses((prevCourses: any) => [...prevCourses, addedCourse]);

      return addedCourse;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }, []);

  const editCourse = useCallback(async ({ id, newCourse }: any) => {
    try {
      const userRequest = {
        endpoint: `/cursos/${id}`,
        config: {
          method: "PUT",
          data: JSON.stringify(newCourse),
        },
      };

      const editedCourse = await fetchData(userRequest);

      setCourses((prevCourses: any) => [...prevCourses, editedCourse]);

      return editedCourse;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }, []);

  const deleteCourse = useCallback(async (id: any) => {
    try {
      const userRequest = {
        endpoint: `/cursos/${id}`,
        config: {
          method: "DELETE",
        },
      };

      const courseDeleted = await fetchData(userRequest);

      setCourses((prevCourses: any) =>
        prevCourses.filter((course: any) => course.id !== id)
      );

      return courseDeleted;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }, []);

  const getStudent = useCallback(async () => {
    try {
      const userRequest = {
        endpoint: "/alunos",
      };
      const _students = await fetchData(userRequest);

      console.log(_students);
      setStudents(_students);
    } catch (error) {
      console.log("Ocorreu um erro ao tentar mostrar os alunos!");
      console.error((error as Error).message);
    }
  }, []);

  console.log(getStudent);

  const value = useMemo(
    () => ({
      students,
      courses,
      addCourse,
      editCourse,
      getCourses,
      searchCourse,
      deleteCourse,
    }),
    [
      students,
      getStudent,
      courses,
      addCourse,
      editCourse,
      getCourses,
      searchCourse,
      deleteCourse,
    ]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
