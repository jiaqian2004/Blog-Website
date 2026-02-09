import { Head, useForm, Link } from "@inertiajs/react";
import { Form, Input, Button, Card, Row, Col, Space, Upload } from "antd";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import AdminLayout from "@/Layouts/AppLayout";

export default function Edit({ blog }) {
    const { TextArea } = Input;
    const [fileList, setFileList] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        title: blog.title,
        description: blog.description,
        cover: null,
        _method: "put", // 👈 Inertia trick for PUT
    });

    const onFinish = () => {
        post(route("admin.blogs.update", blog.id), {
            forceFormData: true, // 👈 必须
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Blog" />

            <Card
                title="Edit Blog"
                style={{
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
            >
                <Row justify="center">
                    <Col xs={24} md={18} lg={14}>
                        <Form layout="vertical" onFinish={onFinish}>
                            {/* Current Cover */}
                            {blog.cover_url && (
                                <div style={{ marginBottom: 24 }}>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            marginBottom: 8,
                                            color: "#64748b",
                                        }}
                                    >
                                        Current Cover
                                    </div>
                                    <img
                                        src={blog.cover_url}
                                        alt="cover"
                                        style={{
                                            width: "100%",
                                            height: 240,
                                            objectFit: "cover",
                                            borderRadius: 8,
                                        }}
                                    />
                                </div>
                            )}

                            {/* Upload New Cover */}
                            <Form.Item
                                label="Replace Cover (optional)"
                                help={errors.cover}
                                validateStatus={errors.cover ? "error" : ""}
                            >
                                <Upload
                                    fileList={fileList}
                                    maxCount={1}
                                    beforeUpload={(file) => {
                                        setFileList([file]); 
                                        setData("cover", file); 
                                        return false;
                                    }}
                                    onRemove={() => {
                                        setFileList([]);
                                        setData("cover", null);     
                                    }}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Upload New Cover
                                    </Button>
                                </Upload>
                            </Form.Item>

                            {/* Title */}
                            <Form.Item
                                label="Title"
                                validateStatus={errors.title ? "error" : ""}
                                help={errors.title}
                            >
                                <Input
                                    size="large"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                            </Form.Item>

                            {/* Description */}
                            <Form.Item
                                label="Description"
                                validateStatus={
                                    errors.description ? "error" : ""
                                }
                                help={errors.description}
                            >
                                <TextArea
                                    rows={8}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                            </Form.Item>

                            {/* Actions */}
                            <Form.Item>
                                <Space>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        icon={<SaveOutlined />}
                                        loading={processing}
                                    >
                                        Update Blog
                                    </Button>

                                    <Link href={route("admin.blogs.index")}>
                                        <Button size="large">
                                            Back to List
                                        </Button>
                                    </Link>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </AdminLayout>
    );
}
