import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { fetchData } from "../infrastructure/fetch-data";
import {
  AdminType,
  CursoType,
  PermissionsType,
  UserType,
  AlunoType,
} from "../infrastructure/types";

export type AdminContextType = {
  totalCourses: number;
  totalPage: number;
  admins: AdminType[];
  addAdmin: (newAdmin: AdminType) => Promise<AdminType>;
  editAdmin: (params: {
    id: string;
    newAdmin: AdminType;
  }) => Promise<AdminType>;
  deleteAdmin: (id: string) => Promise<AdminType>;
  users: UserType[];
  getUsers: () => Promise<void>;
  deleteUser: (id: string) => Promise<UserType>;
  searchUser: (
    username: string,
    name: string,
    status: string
  ) => Promise<UserType[]>;
  students: AlunoType[];
  editStudent: (params: { newStudent: AlunoType }) => Promise<AlunoType>;
  searchStudent: (
    name: string,
    cpf: string,
    matricula: string
  ) => Promise<void>;
  getStudent: () => Promise<void>;
  addStudents: (newStudent: AlunoType) => Promise<AlunoType>;
  deleteStudent: (id: string) => Promise<AlunoType>;
  courses: CursoType[];
  addCourse: (newCourse: CursoType) => Promise<CursoType>;
  editCourse: (params: {
    id: string;
    newCourse: CursoType;
  }) => Promise<CursoType>;
  getCourses: (page: number) => Promise<void>;
  searchCourse: (
    name: string,
    page?: number,
    size?: number
  ) => Promise<CursoType[]>;
  deleteCourse: (id: string) => Promise<CursoType>;
  permissions: PermissionsType[];
  addPermission: (newPermission: PermissionsType) => Promise<PermissionsType>;
  getPermissions: () => Promise<void>;
  searchPermission: (descricao: string) => Promise<void>;
  editPermission: (params: {
    id: string;
    newPermission: PermissionsType;
  }) => Promise<PermissionsType>;
  deletePermission: (id: string) => Promise<PermissionsType>;
};

type AdminProviderProps = {
  children: ReactNode;
};

export const AdminContext = createContext<AdminContextType | undefined>(
  undefined
);

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [courses, setCourses] = useState<CursoType[]>([]);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [totalPage, setTotalPages] = useState<number>(0);

  const [admins, setAdmins] = useState<AdminType[]>([]);
  const [students, setStudents] = useState<AlunoType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [permissions, setPermissions] = useState<PermissionsType[]>([]);

  const getCourses = useCallback(
    async (page: number) => {
      try {
        const userRequest = {
          endpoint: `/cursos?page=${page}`,
          method: "GET",
        };

        const response = await fetchData(userRequest);

        setCourses(response.content);
        setTotalPages(response.totalPages);
        setTotalCourses(response.totalElements);
      } catch (error) {
        console.error("Erro ao buscar cursos:", (error as Error).message);
        setCourses([]);
        setTotalPages(0);
        setTotalCourses(0);
      }
    },
    [fetchData, setCourses, setTotalPages, setTotalCourses]
  );

  const searchCourse = useCallback(
    async (name: string, page: number = 0, size: number = 10) => {
      try {
        const userRequest = {
          endpoint: `/cursos?nome=${name}&page=${page}&size=${size}`,
        };

        const response = await fetchData(userRequest);

        const _courses = response.content;

        setCourses((prevCourses: CursoType[]) => {
          if (page > 0) {
            return [...prevCourses, ..._courses];
          } else {
            return _courses;
          }
        });

        return _courses;
      } catch (error) {
        console.error((error as Error).message);
        throw new Error((error as Error).message);
      }
    },
    []
  );

  const searchStudent = useCallback(
    async (name: string, cpf: string, matricula: string) => {
      try {
        const queryParams = new URLSearchParams();
        if (name) queryParams.append("nome", name.trim());
        if (matricula) queryParams.append("matricula", matricula.trim());
        if (cpf) queryParams.append("cpf", cpf.trim());

        const endpoint = `/alunos?${queryParams.toString()}`;
        const userRequest = { endpoint };

        const response = await fetchData(userRequest);

        const _students = response.content;

        setStudents(_students);
      } catch (error) {
        console.error((error as Error).message);
        throw new Error((error as Error).message);
      }
    },
    []
  );

  const searchUser = useCallback(
    async (
      username: string,
      name: string,
      status: string
    ): Promise<UserType[]> => {
      try {
        const queryParams = new URLSearchParams();
        if (username) queryParams.append("username", username.trim());
        if (name) queryParams.append("nome", name.trim());
        if (status) queryParams.append("status", status);

        const endpoint = `/usuarios?${queryParams.toString()}`;
        const userRequest = { endpoint };

        const response = await fetchData(userRequest);

        const _users = response.content;

        setUsers(_users);
        return _users;
      } catch (error) {
        console.error((error as Error).message);
        throw new Error((error as Error).message);
      }
    },
    []
  );

  const addCourse = useCallback(async (newCourse: CursoType) => {
    try {
      const userRequest = {
        endpoint: "/cursos",
        config: {
          method: "POST",
          data: JSON.stringify(newCourse),
        },
      };

      const addedCourse = await fetchData(userRequest);

      setCourses((prevCourses: CursoType[]) => {
        return [...prevCourses, addedCourse];
      });

      return addedCourse;
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }, []);

  const editCourse = useCallback(
    async ({ id, newCourse }: { id: string; newCourse: CursoType }) => {
      try {
        const userRequest = {
          endpoint: `/cursos/${id}`,
          config: {
            method: "PUT",
            data: JSON.stringify(newCourse),
          },
        };

        const editedCourse = await fetchData(userRequest);

        setCourses((prevCourses: CursoType[]) => [
          ...prevCourses,
          editedCourse,
        ]);

        return editedCourse;
      } catch (error) {
        console.error((error as Error).message);
        throw new Error((error as Error).message);
      }
    },
    []
  );

  const deleteCourse = useCallback(async (id: string) => {
    try {
      const userRequest = {
        endpoint: `/cursos/${id}`,
        config: {
          method: "DELETE",
        },
      };

      const response = await fetchData(userRequest);

      const courseDeleted = response.content;

      setCourses((prevCourses: CursoType[]) =>
        prevCourses.filter((course: CursoType) => course.id !== id)
      );

      return courseDeleted;
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }, []);

  const editStudent = useCallback(
    async ({ newStudent }: { newStudent: AlunoType }) => {
      try {
        const userRequest = {
          endpoint: `/alunos/${newStudent.pessoa.id}`,
          config: {
            method: "PUT",
            data: JSON.stringify(newStudent.pessoa),
          },
        };

        const editedStudent = await fetchData(userRequest);

        setStudents((prevStudent: AlunoType[]) => [
          ...prevStudent,
          editedStudent,
        ]);

        return editedStudent;
      } catch (error) {
        console.error((error as Error).message);
        throw new Error((error as Error).message);
      }
    },
    []
  );

  const getStudent = useCallback(async () => {
    try {
      const userRequest = {
        endpoint: "/alunos",
        method: "GET",
      };

      const response = await fetchData(userRequest);

      const _students = response.content;
      setStudents(_students);
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }, []);

  const addStudents = useCallback(async (newStudent: AlunoType) => {
    try {
      const userRequest = {
        endpoint: "/usuarios/alunos/novo-aluno",
        config: {
          method: "POST",
          data: JSON.stringify(newStudent),
        },
      };

      const addedStudent = await fetchData(userRequest);

      setStudents((prevStudent: AlunoType[]) => [...prevStudent, addedStudent]);
      return addedStudent;
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }, []);

  const deleteStudent = useCallback(async (id: string) => {
    try {
      const userRequest = {
        endpoint: `/alunos/${id}`,
        config: {
          method: "DELETE",
        },
      };

      const response = await fetchData(userRequest);

      const studentDeleted = response.content;
      setStudents((prevStudent: AlunoType[]) =>
        prevStudent.filter((student: AlunoType) => student.id !== id)
      );

      return studentDeleted.content;
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const userRequest = {
        endpoint: "/usuarios",
        config: {
          method: "GET",
        },
      };

      const response = await fetchData(userRequest);

      const _users = response.content;

      setUsers(_users);
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }, []);

  const addAdmin = useCallback(async (newAdmin: AdminType) => {
    try {
      const userRequest = {
        endpoint: "/usuarios/administradores/novo-administrador",
        config: {
          method: "POST",
          data: JSON.stringify(newAdmin),
        },
      };

      const addedAdmin = await fetchData(userRequest);

      setAdmins((prevAdmin: AdminType[]) => [...prevAdmin, addedAdmin]);

      return addedAdmin;
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }, []);

  const deleteAdmin = useCallback(async (id: string) => {
    try {
      const userRequest = {
        endpoint: `/usuarios/${id}`,
        config: {
          method: "DELETE",
        },
      };

      const response = await fetchData(userRequest);

      const adminDeleted = response.content;

      setAdmins((prevAdmin: AdminType[]) =>
        prevAdmin.filter((admin: AdminType) => admin.id !== id)
      );
      return adminDeleted;
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    try {
      const userRequest = {
        endpoint: `/usuarios/${id}`,
        config: {
          method: "DELETE",
        },
      };

      const response = await fetchData(userRequest);

      const userDeleted = response.content;
      setUsers((prevUser: UserType[]) =>
        prevUser.filter((user: UserType) => user.id !== id)
      );

      return userDeleted;
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }, []);

  const editAdmin = useCallback(
    async ({ id, newAdmin }: { id: string; newAdmin: AdminType }) => {
      try {
        const userRequest = {
          endpoint: `/usuarios/${id}`,
          config: {
            method: "PUT",
            data: JSON.stringify(newAdmin),
          },
        };

        const editedAdmin = await fetchData(userRequest);

        setAdmins((prevadmin: AdminType[]) => [...prevadmin, editedAdmin]);

        return editedAdmin;
      } catch (error) {
        console.error((error as Error).message);
        throw new Error((error as Error).message);
      }
    },
    []
  );

  const getPermissions = useCallback(async () => {
    try {
      const userRequest = {
        endpoint: "permissoes",
        config: {
          method: "GET",
        },
      };

      const response = await fetchData(userRequest);

      const _permissions = response.content;

      setPermissions(_permissions);
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }, []);

  const addPermission = useCallback(async (newPermission: PermissionsType) => {
    try {
      const userRequest = {
        endpoint: "/permissoes",
        config: {
          method: "POST",
          data: JSON.stringify(newPermission),
        },
      };

      const addedPermission = await fetchData(userRequest);

      setPermissions((prevPermissions: PermissionsType[]) => [
        ...prevPermissions,
        addedPermission,
      ]);
      return addedPermission;
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }, []);

  const searchPermission = useCallback(async (descricao: string) => {
    try {
      const userRequest = {
        endpoint: `/permissoes?descricao=${descricao}`,
      };

      const response = await fetchData(userRequest);

      const _permissions = response.content;

      setPermissions(_permissions);
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }, []);

  const editPermission = useCallback(
    async ({
      id,
      newPermission,
    }: {
      id: string;
      newPermission: PermissionsType;
    }) => {
      try {
        const userRequest = {
          endpoint: `/permissoes/${id}`,
          config: {
            method: "PUT",
            data: JSON.stringify(newPermission),
          },
        };

        const editedPermission = await fetchData(userRequest);

        setPermissions((prevPermissions: PermissionsType[]) => [
          ...prevPermissions,
          editedPermission,
        ]);

        return editedPermission;
      } catch (error) {
        console.error((error as Error).message);
        throw new Error((error as Error).message);
      }
    },
    []
  );

  const deletePermission = useCallback(async (id: string) => {
    try {
      const userRequest = {
        endpoint: `permissoes/${id}`,
        config: {
          method: "DELETE",
        },
      };

      const response = await fetchData(userRequest);

      const deletedPermission = response.content;

      setPermissions((prevPermissions: PermissionsType[]) =>
        prevPermissions.filter(
          (permission: PermissionsType) => permission.id !== id
        )
      );
      return deletedPermission;
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }, []);

  const value = useMemo(
    () => ({
      admins,
      totalPage,
      totalCourses,
      addAdmin,
      editAdmin,
      deleteAdmin,
      users,
      getUsers,
      deleteUser,
      searchUser,
      students,
      editStudent,
      searchStudent,
      getStudent,
      addStudents,
      deleteStudent,
      courses,
      addCourse,
      editCourse,
      getCourses,
      searchCourse,
      deleteCourse,
      permissions,
      addPermission,
      getPermissions,
      searchPermission,
      editPermission,
      deletePermission,
    }),
    [
      admins,
      totalPage,
      totalCourses,
      addAdmin,
      editAdmin,
      deleteAdmin,
      users,
      getUsers,
      deleteUser,
      searchUser,
      students,
      editStudent,
      searchStudent,
      students,
      getStudent,
      courses,
      addStudents,
      addCourse,
      editCourse,
      getCourses,
      searchCourse,
      deleteCourse,
      permissions,
      getPermissions,
      addPermission,
      searchPermission,
      editPermission,
      deletePermission,
    ]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
