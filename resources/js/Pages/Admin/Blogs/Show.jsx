import { Head, Link } from "@inertiajs/react";
import { Card, Button, Row, Col, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import AdminLayout from "@/Layouts/AppLayout";

export default function Show({ blog }) {
    return (
        <AdminLayout>
            <Head title="View Blog" />

            <Card
                title="Blog Details"
                style={{
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
            >
                <Row justify="center">
                    <Col xs={24} md={18} lg={14}>
                        {/* Cover */}
                        {blog.cover_url && (
                            <img
                                src={blog.cover_url}
                                alt="cover"
                                style={{
                                    width: "100%",
                                    height: 360,
                                    objectFit: "cover",
                                    borderRadius: 12,
                                    marginBottom: 24,
                                }}
                            />
                        )}{" "}
                        {/* xs:w-6 md:w-5 */}
                        {/* Title */}
                        <h1
                            style={{
                                fontSize: 28,
                                marginBottom: 12,
                            }}
                        >
                            {blog.title}
                        </h1>
                        {/* Meta */}
                        <div
                            style={{
                                color: "#64748b",
                                marginBottom: 24,
                                fontSize: 14,
                            }}
                        >
                            By {blog.user?.name} ·{" "}
                            {new Date(blog.created_at).toLocaleString()}
                        </div>
                        {/* Content */}
                        <div
                            style={{
                                lineHeight: 1.8,
                                fontSize: 16,
                                whiteSpace: "pre-wrap",
                            }}
                        >
                            {blog.description}
                        </div>
                        {/* Actions */}
                        <div style={{ marginTop: 32 }}>
                            <Space>
                                <Link href={route("admin.blogs.edit", blog.id)}>
                                    <Button type="primary">Edit</Button>
                                </Link>

                                <Link href={route("admin.blogs.index")}>
                                    <Button>Back to list</Button>
                                </Link>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </Card>
        </AdminLayout>
    );
}
