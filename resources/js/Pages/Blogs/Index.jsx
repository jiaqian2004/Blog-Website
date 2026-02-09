import { Head, Link } from "@inertiajs/react";
import { Row, Col, Button, Pagination } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import AppLayout from "@/Layouts/AppLayout";

function ImageBlock({ url }) {
    return (
        <div
            style={{
                width: "100%",
                height: 200,
                background: "#f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {url ? (
                <img
                    src={url}
                    alt="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            ) : (
                <span
                    style={{
                        fontSize: 14,
                        color: "#94a3b8",
                    }}
                ></span>
            )}
        </div>
    );
}

export default function Index({ blogs }) {
    return (
        <AppLayout>
            <Head title="Home" />

            {/* Page Header */}
            <div style={{ textAlign: "center", marginBottom: 56 }}>
                <h1
                    style={{
                        fontSize: 32,
                        fontWeight: 600,
                        color: "#0f172a",
                        marginBottom: 8,
                    }}
                >
                    Latest Blog Posts
                </h1>
                <p style={{ color: "#64748b" }}>
                    Discover stories, thinking, and expertise
                </p>
            </div>

            {/* Blog Grid */}
            {blogs.data.length === 0 ? (
                <div
                    style={{
                        textAlign: "center",
                        padding: "80px 0",
                        color: "#64748b",
                    }}
                >
                    <h2
                        style={{
                            fontSize: 24,
                            fontWeight: 600,
                            color: "#0f172a",
                            marginBottom: 8,
                        }}
                    >
                        No blogs yet
                    </h2>
                    <p style={{ fontSize: 14 }}>
                        Be the first one to share something ✨
                    </p>
                </div>
            ) : (
                <Row gutter={[24, 24]}>
                    {blogs.data.map((blog) => (
                        <Col xs={24} md={12} lg={8} key={blog.id}>
                            <div
                                style={{
                                    background: "#ffffff",
                                    borderRadius: 14,
                                    overflow: "hidden",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                                }}
                            >
                                {/* Cover (always rendered) */}
                                <ImageBlock url={blog.cover_url} />

                                {/* Content */}
                                <div
                                    style={{
                                        padding: 20,
                                        display: "flex",
                                        flexDirection: "column",
                                        flex: 1,
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 600,
                                            color: "#0f172a",
                                            marginBottom: 8,
                                        }}
                                    >
                                        {blog.title}
                                    </h3>

                                    <p
                                        style={{
                                            fontSize: 14,
                                            color: "#64748b",
                                            lineHeight: 1.6,
                                            marginBottom: 16,
                                            flex: 1,
                                        }}
                                    >
                                        {blog.description.slice(0, 120)}...
                                    </p>

                                    <div
                                        style={{
                                            fontSize: 12,
                                            color: "#94a3b8",
                                            marginBottom: 16,
                                        }}
                                    >
                                        By {blog.user?.name} ·{" "}
                                        {new Date(
                                            blog.created_at,
                                        ).toLocaleDateString()}
                                    </div>

                                    <Link href={route("blogs.show", blog.id)}>
                                        <Button
                                            type="primary"
                                            icon={<ArrowRightOutlined />}
                                        >
                                            Read more
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
            {/* Pagination */}
            {blogs.last_page > 1 && (
                <div
                    style={{
                        marginTop: 56,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Pagination
                        current={blogs.current_page}
                        total={blogs.total}
                        pageSize={blogs.per_page}
                        onChange={(page) => {
                            window.location.href = `/?page=${page}`;
                        }}
                    />
                </div>
            )}
        </AppLayout>
    );
}
