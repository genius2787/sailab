"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "./ui/button";

interface BlogMedia {
  type: 'image' | 'video' | 'youtube';
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  thumbnail?: string;
}

interface BlogMediaProps {
  media: BlogMedia[];
}

export function BlogMediaGallery({ media }: BlogMediaProps) {
  const [selectedMedia, setSelectedMedia] = useState<BlogMedia | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (mediaItem: BlogMedia) => {
    setSelectedMedia(mediaItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setIsModalOpen(false);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  if (!media || media.length === 0) return null;

  return (
    <>
      {/* Media Gallery */}
      <div className="my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((item, index) => (
            <div
              key={index}
              className="relative group cursor-pointer rounded-lg overflow-hidden bg-muted hover-lift transition-all duration-300"
              onClick={() => openModal(item)}
            >
              {item.type === 'image' && (
                <img
                  src={item.url}
                  alt={item.alt || `Media ${index + 1}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}

              {item.type === 'video' && (
                <div className="relative">
                  <img
                    src={item.thumbnail || item.url}
                    alt={item.alt || `Video ${index + 1}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                    <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                </div>
              )}

              {item.type === 'youtube' && (
                <div className="relative">
                  <img
                    src={item.thumbnail || getYouTubeThumbnail(item.url) || item.url}
                    alt={item.alt || `YouTube Video ${index + 1}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                    <div className="w-16 h-12 bg-red-600 rounded flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm font-mono">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for enlarged view */}
      {isModalOpen && selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-12 right-0 text-white hover:text-red-400 z-10"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </Button>

            {selectedMedia.type === 'image' && (
              <img
                src={selectedMedia.url}
                alt={selectedMedia.alt || 'Enlarged image'}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            )}

            {selectedMedia.type === 'video' && (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                className="w-full h-auto max-h-[80vh] rounded-lg"
              />
            )}

            {selectedMedia.type === 'youtube' && (
              <div className="aspect-video w-full">
                <iframe
                  src={getYouTubeEmbedUrl(selectedMedia.url)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              </div>
            )}

            {selectedMedia.caption && (
              <div className="mt-4 text-center">
                <p className="text-white font-mono text-sm">{selectedMedia.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}