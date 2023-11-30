import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const PostCreator = ({ onPostSubmit, editingPost, onClose }) => {
    const [showModal, setShowModal] = useState(false);
    // Inicializa o state com dados vazios ou dados do post a ser editado
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    // Efeito para preencher o formulário quando um post é passado para edição
    useEffect(() => {
        if (editingPost) {
            setShowModal(true);
            setAuthor(editingPost.author);
            setCategory(editingPost.category);
            setContent(editingPost.content);
        }
    }, [editingPost]);

    const handleClose = () => {
        setShowModal(false);
        if (onClose) {
            onClose(); // Reseta o post em edição quando o modal é fechado
        }
    };

    const handleShow = () => setShowModal(true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("author", author);
        formData.append("category", category);
        formData.append("content", content);
        if (selectedImage) {
            formData.append("image", selectedImage);
        }
        if (editingPost) {
            formData.append("_method", "PATCH");
        }

        // Decide se deve criar um novo post ou atualizar um existente
        const method = editingPost ? "PATCH" : "POST";
        const url = editingPost ? `/api/posts/${editingPost.id}` : "/api/posts";

        try {
            const response = await fetch(url, {
                method: method === "PATCH" ? "POST" : method, // Usamos POST aqui porque o FormData não suporta PATCH diretamente
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(
                    `Erro ao submeter post: ${response.statusText}`
                );
            }
            const result = await response.json();
            onPostSubmit(result, editingPost ? "edit" : "create"); // Informa se é edição ou criação
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    // Botão para abrir o modal em modo de criação
    const openModalForCreate = () => {
        setAuthor(JSON.parse(localStorage.getItem("user")).name);
        setCategory("");
        setContent("");
        setSelectedImage(null);
        handleShow();
    };

    return (
        <>
            <div className="d-flex justify-content-center my-2">
                <Button
                    variant="primary"
                    className="w-25"
                    onClick={openModalForCreate}
                >
                    Criar post
                </Button>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingPost ? "Editar post" : "Criar post"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="postAuthor">
                            <Form.Label>Autor do Post</Form.Label>
                            <Form.Control
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Digite o autor do post"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postCategory">
                            <Form.Label>Selecione a categoria</Form.Label>
                            <Form.Select
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="Post">Post</option>
                                <option value="Artigo">Artigo</option>
                                <option value="Grupo">Grupo</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postContent">
                            <Form.Label>Escrever publicação</Form.Label>
                            <ReactQuill value={content} onChange={setContent} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postImage">
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) =>
                                    setSelectedImage(e.target.files[0])
                                }
                            />
                        </Form.Group>
                        <div className="text-end">
                            <Button variant="primary" onClick={handleSubmit}>
                                Publicar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PostCreator;
