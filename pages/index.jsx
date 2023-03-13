import { Button, Collapse, Input, Space, Table } from "antd";
import { useEffect, useState } from "react";
import Stats from "../components/Stats";
import Trophy from "../components/Trophy";
import styles from "../styles/Home.module.css";

const Main = () => {

  const [users, setUsers] = useState([]);
  const [usersToShow, setUsersToShow] = useState(users);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/leaderboard");

      if (res.ok) {
        const users = await res.json();
        setUsers(users);
        setUsersToShow(users);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = search => setUsersToShow(users.filter(user => user.name.toLowerCase().includes(search.toLowerCase())));

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      render: rank => rank.toLocaleString("en-US"),
      sorter: (a, b) => a.rank - b.rank
    },
    {
      title: "24h change",
      dataIndex: "change",
      render: change => <span style={{ color: change > 0 ? "#20c520" : change < 0 ? "red" : null }}>{change > 0 ? `+${change}` : change}</span>,
      sorter: (a, b) => a.change - b.change
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: "XP",
      dataIndex: "xp",
      render: xp => xp.toLocaleString("en-US"),
      sorter: (a, b) => a.xp - b.xp
    },
    {
      title: "Level",
      dataIndex: "level",
      render: level => level.toLocaleString("en-US"),
      sorter: (a, b) => a.level - b.level
    },
    {
      title: "Cashouts",
      dataIndex: "cashouts",
      render: cashouts => cashouts.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
      sorter: (a, b) => a.cashouts - b.cashouts
    },
    {
      title: "Fame",
      dataIndex: "fame",
      render: fame => <><Trophy fame={fame} /> {fame.toLocaleString("en-US")}</>,
      sorter: (a, b) => a.fame - b.fame
    }
  ];

  return (
    <div className={styles.container}>

      <h1 style={{ textDecorationLine: "underline" }}>THE FINALS - Unofficial Beta Leaderboard</h1>
      <h5>
        Top 10,000 users from the current playtest.
        You can find the official leaderboard <a href="https://www.reachthefinals.com/leaderboard-beta" target="_blank" className={styles["link-dark"]}>here</a>.
        Created by <a href="https://twitter.com/mozzyfx" target="_blank" className={styles["link-dark"]}>me</a>.
        API <a href="/api/leaderboard" target="_blank" className={styles["link-dark"]}>here</a>.
      </h5>
      <hr />

      <Space style={{ width: "100%" }} direction="vertical">
        <Input size="large" placeholder="Search for a user" onChange={e => filterUsers(e.target.value)} />
        <Space>
          <Button disabled={loading} onClick={fetchData}>Refresh data</Button>
          <span>{usersToShow.length.toLocaleString("en-US")} {usersToShow.length === 1 ? "user" : "users"}</span>
        </Space>
        {error ?
          <h1>Error</h1>
          :
          <Space style={{ width: "100%" }} direction="vertical">
            <Table
              columns={columns}
              dataSource={usersToShow}
              scroll={{ x: true }}
              loading={loading}
            />

            <Collapse>
              <Collapse.Panel header="Stats">
                <Stats users={users} />
              </Collapse.Panel>
            </Collapse>
          </Space>
        }
      </Space>
    </div>
  );
};

export default Main;