import React, { FC, useEffect } from "react";

import { Layout } from "layouts";
import { Container } from "components";
import { api } from "api";

export const MainPage: FC = () => {
  const fetchUsers = async () => {
    try {
      const response = await api.fetchProfile();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout currentPage="main">
      <Container>
        <div>Главная</div>
      </Container>
    </Layout>
  );
};
