import { useState } from 'react';
import Aside from '../../components/Aside/Aside.jsx';
import httpClient from '../../services/httpClient.js';
import toast from 'react-hot-toast';

const UploadVideo = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    videoFile: null,
    thumbnail: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.videoFile || !form.title || !form.description) {
      toast.error('Please fill all required fields and select a video.');
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      setIsSubmitting(true);
      await httpClient.post('/videos', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Video uploaded successfully!');
      setForm({
        title: '',
        description: '',
        videoFile: null,
        thumbnail: null,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Video upload failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-white text-slate-900 dark:bg-[#121212] dark:text-white">
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
          <div className="mx-auto max-w-3xl p-4">
            <h1 className="text-xl font-semibold">Upload Video</h1>
            <p className="mt-1 text-sm text-gray-400">
              Share your content with the community. Videos stay private until you publish them.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 rounded-lg border border-zinc-800 bg-black/40 p-4">
              <div className="w-full border-2 border-dashed border-zinc-700 px-4 py-10 text-center">
                <span className="mb-4 inline-block w-20 rounded-full bg-[#9ef9ff] p-4 text-[#08e6f5]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </span>
                <h6 className="mb-2 font-semibold">Drag and drop video files to upload</h6>
                <p className="text-sm text-gray-400">
                  Your videos will be private until you publish them.
                </p>
                <p className="mt-2 text-sm font-semibold text-red-500">Limit (100MB)</p>

                <label
                  htmlFor="videoFile"
                  className="group/btn mt-4 inline-flex cursor-pointer items-center gap-x-2 bg-[#08e6f5] px-4 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                >
                  <input
                    type="file"
                    id="videoFile"
                    name="videoFile"
                    accept="video/*"
                    onChange={handleChange}
                    className="sr-only"
                  />
                  Select video
                </label>

                {form.videoFile && (
                  <p className="mt-3 text-sm text-gray-300">
                    Selected: <span className="font-medium">{form.videoFile.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="thumbnail" className="mb-1 inline-block text-sm font-medium">
                  Thumbnail
                </label>
                <input
                  id="thumbnail"
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleChange}
                  className="mt-1 w-full cursor-pointer rounded border border-zinc-700 bg-transparent px-2 py-1 text-sm file:mr-4 file:cursor-pointer file:border-none file:bg-[#08e6f5] file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-black"
                />
              </div>

              <div>
                <label htmlFor="title" className="mb-1 inline-block text-sm font-medium">
                  Title <sup>*</sup>
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:border-[#08e6f5] focus:ring-1 focus:ring-[#08e6f5]"
                  placeholder="Add a descriptive title"
                />
              </div>

              <div>
                <label htmlFor="description" className="mb-1 inline-block text-sm font-medium">
                  Description <sup>*</sup>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="mt-1 h-32 w-full resize-none rounded border border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:border-[#08e6f5] focus:ring-1 focus:ring-[#08e6f5]"
                  placeholder="Tell viewers about your video"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="rounded border border-zinc-700 px-4 py-2 text-sm font-medium hover:bg-white/5"
                  onClick={() =>
                    setForm({
                      title: '',
                      description: '',
                      videoFile: null,
                      thumbnail: null,
                    })
                  }
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group/btn inline-flex items-center gap-x-2 rounded bg-[#08e6f5] px-4 py-2 text-sm font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out hover:bg-[#5ff0ff] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_#4f4e4e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting && (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-b-2 border-black" />
                  )}
                  <span>{isSubmitting ? 'Uploading...' : 'Upload'}</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UploadVideo;

