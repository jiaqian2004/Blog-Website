import { Head, Link, router } from "@inertiajs/react";
import { Table, Card, Space, Tooltip, Modal, Button, Grid, List } from "antd";
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
import AdminLayout from "@/Layouts/AppLayout";

const { useBreakpoint } = Grid;

export default function Index({ blogs }) {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const handleDelete = (id) => {
        Modal.confirm({
            title: "Delete Blog",
            content: "Are you sure you want to delete this blog?",
            okText: "Yes, delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: () => {
                router.delete(route("admin.blogs.destroy", id));
            },
        });
    };

    const columns = [
        {
            title: "#",
            key: "index",
            width: 60,
            render: (_, __, index) => index + 1,
        },
        {
            title: "Cover",
            dataIndex: "cover_url",
            key: "cover",
            width: 80,
            render: (url) =>
                url ? (
                    <img
                        src={url}
                        alt="cover"
                        style={{
                            width: 48,
                            height: 48,
                            objectFit: "cover",
                            borderRadius: 6,
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            background: "#e5e7eb",
                            borderRadius: 6,
                        }}
                    />
                ),
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 60,
            responsive: ["md"],
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
            responsive: ["lg"],
        },
        {
            title: "Author",
            key: "author",
            render: (_, record) => record.user?.name ?? "-",
            responsive: ["md"],
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (date) => new Date(date).toLocaleDateString(),
            responsive: ["lg"],
        },
        {
            title: "Actions",
            key: "actions",
            width: 120,
            render: (_, record) => (
                <Space>
                    <Tooltip title="View">
                        <Link href={route("admin.blogs.show", record.id)}>
                            <EyeOutlined
                                style={{ color: "#64748b", fontSize: 16 }}
                            />
                        </Link>
                    </Tooltip>

                    <Tooltip title="Edit">
                        <Link href={route("admin.blogs.edit", record.id)}>
                            <EditOutlined
                                style={{ color: "#2563eb", fontSize: 16 }}
                            />
                        </Link>
                    </Tooltip>

                    <Tooltip title="Delete">
                        <DeleteOutlined
                            style={{
                                color: "#dc2626",
                                fontSize: 16,
                                cursor: "pointer",
                            }}
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const MobileList = (
        <List
            dataSource={blogs}
            renderItem={(blog) => (
                <Card
                    key={blog.id}
                    style={{ marginBottom: 16 }}
                    bodyStyle={{ padding: 16 }}
                >
                    {blog.cover_url && (
                        <img
                            src={blog.cover_url}
                            alt="cover"
                            style={{
                                width: "100%",
                                height: 160,
                                objectFit: "cover",
                                borderRadius: 8,
                                marginBottom: 12,
                            }}
                        />
                    )}
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>
                        {blog.title}
                    </div>

                    <div style={{ fontSize: 12, color: "#64748b" }}>
                        By {blog.user?.name} ·{" "}
                        {new Date(blog.created_at).toLocaleDateString()}
                    </div>

                    <Space style={{ marginTop: 12 }}>
                        <Tooltip title="View">
                            <Link href={route("admin.blogs.show", blog.id)}>
                                <EyeOutlined />
                            </Link>
                        </Tooltip>

                        <Tooltip title="Edit">
                            <Link href={route("admin.blogs.edit", blog.id)}>
                                <EditOutlined style={{ color: "#2563eb" }} />
                            </Link>
                        </Tooltip>

                        <Tooltip title="Delete">
                            <DeleteOutlined
                                style={{ color: "#dc2626" }}
                                onClick={() => handleDelete(blog.id)}
                            />
                        </Tooltip>
                    </Space>
                </Card>
            )}
        />
    );
    const DesktopTable = (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={blogs}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 300 }}
        />
    );

    return (
        <AdminLayout>
            <Head title="Admin · Blogs" />

            <Card
                title="Blog Management"
                extra={
                    <Space>
                        <Button
                            icon={<DownloadOutlined />}
                            onClick={() =>
                                (window.location.href =
                                    route("admin.blogs.export"))
                            }
                        >
                            Export Excel
                        </Button>

                        <Link href={route("admin.blogs.create")}>
                            <Button type="primary" icon={<PlusOutlined />}>
                                Create Blog
                            </Button>
                        </Link>
                    </Space>
                }
            >
                {isMobile ? MobileList : DesktopTable}
            </Card>
        </AdminLayout>
    );
}
