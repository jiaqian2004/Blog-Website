import { Head, useForm } from "@inertiajs/react";
import { Form, Input, Button, Card, Row, Col, Upload } from "antd";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import AdminLayout from "@/Layouts/AppLayout";

const { TextArea } = Input;

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        cover: null,
    });

    const onFinish = () => {
        post(route("admin.blogs.store"));
    };

    return (
        <AdminLayout>
            <Head title="Create Blog" />

            <Card
                title="Create Blog"
                style={{
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
            >
                <Row justify="center">
                    <Col xs={24} md={18} lg={14}>
                        <Form layout="vertical" onFinish={onFinish}>
                            {/* Title */}
                            <Form.Item
                                label="Title"
                                validateStatus={errors.title ? "error" : ""}
                                help={errors.title}
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter blog title"
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
                                    placeholder="Write your blog content..."
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    style={{ resize: "none" }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Cover Image"
                                validateStatus={errors.cover ? "error" : ""}
                                help={errors.cover}
                            >
                                <Upload
                                    listType="picture"
                                    maxCount={1}
                                    beforeUpload={(file) => {
                                        setData("cover", file); 
                                        return false; //
                                    }}
                                    onRemove={() => {
                                        setData("cover", null);
                                    }}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Upload Cover
                                    </Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    icon={<SaveOutlined />}
                                    loading={processing}
                                >
                                    Create Blog
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </AdminLayout>
    );
}
