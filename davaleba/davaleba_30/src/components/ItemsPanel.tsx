import { useEffect, useState, useCallback } from 'react';
import type { Item } from '../types';
import { api } from '../api';

const LIMIT = 5;

type FormState = { name: string; description: string };
const emptyForm: FormState = { name: '', description: '' };

export default function ItemsPanel() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async (targetPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getItems(targetPage, LIMIT);
      setItems(res.data);
      setTotalPages(Math.max(res.totalPages, 1));
      setTotal(res.total);
      setPage(res.page);
    } catch {
      setError('სერვერთან დაკავშირება ვერ მოხერხდა — გაშვებულია თუ არა backend პორტ 3000-ზე?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(1);
  }, [load]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (item: Item) => {
    setEditingId(item.id);
    setForm({ name: item.name, description: item.description });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      if (editingId !== null) {
        await api.updateItem(editingId, form);
      } else {
        await api.createItem(form);
      }
      closeForm();
      await load(editingId !== null ? page : 1);
    } catch {
      setError('ოპერაცია ვერ შესრულდა.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteItem(id);
      const nextPage = items.length === 1 && page > 1 ? page - 1 : page;
      await load(nextPage);
    } catch {
      setError('წაშლა ვერ შესრულდა.');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-ink">ჩანაწერების მართვა</h2>
        </div>
        <button
          onClick={openCreate}
          className="shrink-0 inline-flex items-center gap-2 rounded-md bg-cyan px-4 py-2 text-sm font-semibold text-void hover:brightness-110 active:scale-[0.98] transition"
        >
          <span className="text-base leading-none">+</span> ახალი ჩანაწერი
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-dim bg-red-dim/20 px-4 py-3 text-sm text-red">
          {error}
        </div>
      )}

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-panel-raised text-left font-mono text-xs uppercase tracking-wider text-ink-faint">
              <th className="px-4 py-3 w-16">ID</th>
              <th className="px-4 py-3">დასახელება</th>
              <th className="px-4 py-3">აღწერა</th>
              <th className="px-4 py-3 w-40 text-right">მოქმედება</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-ink-faint font-mono text-xs">
                  იტვირთება…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-ink-faint font-mono text-xs">
                  ჩანაწერები არ მოიძებნა
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border-soft last:border-0 hover:bg-panel-raised/60 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-ink-faint">#{item.id}</td>
                  <td className="px-4 py-3 text-ink font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-ink-dim max-w-xs truncate">
                    {item.description || <span className="text-ink-faint">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="rounded-md border border-border px-2.5 py-1 text-xs text-ink-dim hover:text-cyan hover:border-cyan-dim transition"
                      >
                        რედაქტირება
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-md border border-border px-2.5 py-1 text-xs text-ink-dim hover:text-red hover:border-red-dim transition"
                      >
                        წაშლა
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          disabled={page <= 1 || loading}
          onClick={() => load(page - 1)}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-mono text-ink-dim disabled:opacity-30 disabled:cursor-not-allowed hover:text-ink hover:border-ink-faint transition"
        >
          ← წინა
        </button>
        <div className="flex gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => load(p)}
              className={`h-7 w-7 rounded-md font-mono text-xs transition ${p === page
                  ? 'bg-cyan text-void font-semibold'
                  : 'border border-border text-ink-faint hover:text-ink hover:border-ink-faint'
                }`}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          disabled={page >= totalPages || loading}
          onClick={() => load(page + 1)}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-mono text-ink-dim disabled:opacity-30 disabled:cursor-not-allowed hover:text-ink hover:border-ink-faint transition"
        >
          შემდეგი →
        </button>
      </div>

      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm p-4"
          onClick={closeForm}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={submitForm}
            className="w-full max-w-md rounded-lg border border-border bg-panel p-6 animate-fade-in"
          >
            <h3 className="text-base font-semibold text-ink mb-4">
              {editingId !== null ? 'ჩანაწერის რედაქტირება' : 'ახალი ჩანაწერი'}
            </h3>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-faint mb-1.5">
              დასახელება
            </label>
            <input
              autoFocus
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-md border border-border bg-panel-raised px-3 py-2 text-sm text-ink mb-4 outline-none focus:border-cyan-dim transition"
              placeholder="მაგ: სენსორი A-12"
            />
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-faint mb-1.5">
              აღწერა
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full rounded-md border border-border bg-panel-raised px-3 py-2 text-sm text-ink mb-5 outline-none focus:border-cyan-dim transition resize-none"
              placeholder="მოკლე აღწერა…"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md px-4 py-2 text-sm text-ink-dim hover:text-ink transition"
              >
                გაუქმება
              </button>
              <button
                type="submit"
                disabled={submitting || !form.name.trim()}
                className="rounded-md bg-cyan px-4 py-2 text-sm font-semibold text-void hover:brightness-110 disabled:opacity-40 transition"
              >
                {submitting ? 'ინახება…' : editingId !== null ? 'შენახვა' : 'დამატება'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
