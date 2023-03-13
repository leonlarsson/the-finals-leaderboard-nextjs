import { Divider, Space, Typography } from "antd"
import Trophy from "./Trophy.jsx";

export default ({ users }) => {

    return (
        <Space style={{ width: "100%" }} direction="vertical">

            <Divider style={{ marginBottom: 0 }} orientation="left">Out of the top {users.length.toLocaleString("en-US")} players...</Divider>
            <span><Typography.Text code>{users.filter(user => user.fame >= 1000).length.toLocaleString("en-US")} ({(users.filter(user => user.fame > 1000).length / users.length).toLocaleString("en-US", { style: "percent" })})</Typography.Text> are in <Trophy fame={1000} /> Gold league</span>
            <span><Typography.Text code>{users.filter(user => user.fame < 1000 && user.fame >= 500).length.toLocaleString("en-US")} ({(users.filter(user => user.fame < 1000 && user.fame >= 500).length / users.length).toLocaleString("en-US", { style: "percent" })})</Typography.Text> are in <Trophy fame={500} /> Silver league</span>
            <span><Typography.Text code>{users.filter(user => user.fame < 500).length.toLocaleString("en-US")} ({(users.filter(user => user.fame < 500).length / users.length).toLocaleString("en-US", { style: "percent" })})</Typography.Text> are in <Trophy fame={499} /> Bronze league</span>

            <Divider style={{ marginBottom: 0 }} orientation="left">Averages</Divider>
            <span>Average XP: <Typography.Text code>{(users.map(user => user.xp).reduce((a, b) => a + b, 0) / users.length).toLocaleString("en-US", { maximumFractionDigits: 0 })}</Typography.Text></span>
            <span>Average Level: <Typography.Text code>{(users.map(user => user.level).reduce((a, b) => a + b, 0) / users.length).toLocaleString("en-US", { maximumFractionDigits: 0 })}</Typography.Text></span>
            <span>Average Cashouts: <Typography.Text code>{(users.map(user => user.cashouts).reduce((a, b) => a + b, 0) / users.length).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</Typography.Text></span>
            <span>Average Fame: <Typography.Text code>{(users.map(user => user.fame).reduce((a, b) => a + b, 0) / users.length).toLocaleString("en-US", { maximumFractionDigits: 0 })}</Typography.Text></span>

        </Space>
    )
}