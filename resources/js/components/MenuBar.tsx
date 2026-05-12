import type { Editor } from '@tiptap/core';
import { EditorStateSnapshot, useEditorState } from '@tiptap/react';
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Quote,
    List,
    ListOrdered,
    Minus,
    CornerDownLeft,
    Undo,
    Redo,
    Eraser,
    Code2,
    ImageIcon,
} from 'lucide-react';

interface MenuButtonProps {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
}

const MenuButton = ({
    onClick,
    isActive,
    disabled,
    children,
    title,
}: MenuButtonProps) => (
    <button
        onClick={onClick}
        disabled={disabled}
        type="button"
        title={title}
        className={`rounded-md p-2 transition-all duration-200 ${
            isActive
                ? 'bg-purple-600 text-white'
                : 'bg-transparent text-gray-600 hover:bg-gray-100 disabled:opacity-30'
        } `}
    >
        {children}
    </button>
);

const Separator = () => <div className="mx-1 h-6 w-px bg-gray-200" />;

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;

    const editorState = useEditorState<ReturnType<typeof menuBarStateSelector>>(
        {
            editor,
            selector: menuBarStateSelector,
        },
    );

    return (
        <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 rounded-t-lg border-b border-gray-200 bg-white p-2">
            {/* Inline Formatting */}
            <MenuButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editorState.canBold}
                isActive={editorState.isBold}
                title="Bold"
            >
                <Bold size={18} />
            </MenuButton>

            <MenuButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editorState.canItalic}
                isActive={editorState.isItalic}
                title="Italic"
            >
                <Italic size={18} />
            </MenuButton>

            <MenuButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editorState.canStrike}
                isActive={editorState.isStrike}
                title="Strike"
            >
                <Strikethrough size={18} />
            </MenuButton>

            <MenuButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editorState.canCode}
                isActive={editorState.isCode}
                title="Code"
            >
                <Code size={18} />
            </MenuButton>

            <Separator />

            {/* Headings */}
            <MenuButton
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                isActive={editorState.isHeading1}
                title="Heading 1"
            >
                <span className="text-xs font-bold">H1</span>
            </MenuButton>

            <MenuButton
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                isActive={editorState.isHeading2}
                title="Heading 2"
            >
                <span className="text-xs font-bold">H2</span>
            </MenuButton>

            <MenuButton
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                isActive={editorState.isHeading3}
                title="Heading 3"
            >
                <span className="text-xs font-bold">H3</span>
            </MenuButton>

            <Separator />

            {/* Blocks */}
            <MenuButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editorState.isBulletList}
                title="Bullet List"
            >
                <List size={18} />
            </MenuButton>

            <MenuButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editorState.isOrderedList}
                title="Ordered List"
            >
                <ListOrdered size={18} />
            </MenuButton>

            <MenuButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                isActive={editorState.isCodeBlock}
                title="Code Block"
            >
                <Code2 size={18} />
            </MenuButton>

            <MenuButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editorState.isBlockquote}
                title="Blockquote"
            >
                <Quote size={18} />
            </MenuButton>

            <Separator />

            {/* Utilities */}
            <MenuButton
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                title="Horizontal Rule"
            >
                <Minus size={18} />
            </MenuButton>

            <MenuButton
                onClick={() => editor.chain().focus().setHardBreak().run()}
                title="Hard Break"
            >
                <CornerDownLeft size={18} />
            </MenuButton>

            <MenuButton
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
                title="Clear Formatting"
            >
                <Eraser size={18} />
            </MenuButton>

            <MenuButton
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .setImage({
                            src: window.prompt('Masukkan url gambar') ?? '',
                        })
                        .run()
                }
                title="Image"
            >
                <ImageIcon size={18} />
            </MenuButton>

            <div className="grow" />

            {/* History */}
            <MenuButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editorState.canUndo}
                title="Undo"
            >
                <Undo size={18} />
            </MenuButton>

            <MenuButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editorState.canRedo}
                title="Redo"
            >
                <Redo size={18} />
            </MenuButton>
        </div>
    );
};

function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
    return {
        // Text formatting
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,

        // Block types
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isImage: ctx.editor.isActive('image') ?? false,

        // Lists and blocks
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,

        // History
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
    };
}
