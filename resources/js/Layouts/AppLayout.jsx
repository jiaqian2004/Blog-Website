import { Link, usePage, router } from "@inertiajs/react";
import { Layout, Menu,message } from "antd";
import { useEffect } from "react";

const { Header, Content, Footer } = Layout;

export default function AppLayout({ children }) {
    const { props } = usePage();

    useEffect(() => {
        if (props.flash?.success) {
            message.success(props.flash.success);
        }
    }, [props.flash]);
    const { auth } = usePage().props;

    const logout = () => {
        router.post(route("logout"));
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Header */}
            <Header
                style={{
                    background: "#0f172a",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {/* Left: Brand */}
                <div
                    style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 16,
                    }}
                >
                    Rookie
                </div>

                {/* Right: Menu */}
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectable={false}
                    style={{
                        background: "transparent",
                        marginLeft: "auto", // 👉 推到右边
                    }}
                >
                    <Menu.Item key="home">
                        <Link href="/">Home</Link>
                    </Menu.Item>

                    {!auth?.user && (
                        <>
                            <Menu.Item key="login">
                                <Link href={route("login")}>Login</Link>
                            </Menu.Item>

                            <Menu.Item key="register">
                                <Link href={route("register")}>Register</Link>
                            </Menu.Item>
                        </>
                    )}

                    {auth?.user && (
                        <>
                            <Menu.Item key="dashboard">
                                <Link href={route("admin.blogs.index")}>
                                    Dashboard
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="logout">
                                <span
                                    onClick={logout}
                                    style={{ cursor: "pointer" }}
                                >
                                    Logout
                                </span>
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            </Header>

            {/* Content */}
            <Content
                style={{
                    padding: "48px",
                    maxWidth: 1200,
                    margin: "0 auto",
                    width: "100%",
                }}
            >
                {children}
            </Content>

            {/* Footer */}
            <Footer
                style={{
                    textAlign: "center",
                    background: "#020617",
                    color: "#94a3b8",
                }}
            >
                Laravel Starter Kit © {new Date().getFullYear()}
            </Footer>
        </Layout>
    );
}
