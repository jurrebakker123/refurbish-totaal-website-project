import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Search, 
  Grid3X3, 
  List, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Download,
  Trash2,
  Copy,
  Eye,
  Edit,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  thumbnail?: string;
  size: number;
  uploadDate: Date;
  alt?: string;
  tags: string[];
}

const WordPressMediaLibrary = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      name: 'hero-dakkapel.jpg',
      type: 'image',
      url: '/lovable-uploads/dakkapel-hero.jpg',
      thumbnail: '/lovable-uploads/dakkapel-hero.jpg',
      size: 245760,
      uploadDate: new Date('2024-01-15'),
      alt: 'Dakkapel installatie hero afbeelding',
      tags: ['dakkapel', 'hero', 'home']
    },
    {
      id: '2',
      name: 'schilder-project.jpg',
      type: 'image',
      url: '/lovable-uploads/schilder-project.jpg',
      thumbnail: '/lovable-uploads/schilder-project.jpg',
      size: 189440,
      uploadDate: new Date('2024-01-14'),
      alt: 'Schilderwerk project voorbeeld',
      tags: ['schilder', 'project', 'portfolio']
    },
    {
      id: '3',
      name: 'company-video.mp4',
      type: 'video',
      url: '/videos/company-intro.mp4',
      size: 15728640,
      uploadDate: new Date('2024-01-10'),
      alt: 'Bedrijfs introductie video',
      tags: ['video', 'intro', 'about']
    },
    {
      id: '4',
      name: 'price-list.pdf',
      type: 'document',
      url: '/documents/prijslijst-2024.pdf',
      size: 524288,
      uploadDate: new Date('2024-01-12'),
      alt: 'Prijslijst 2024',
      tags: ['prijzen', 'document', '2024']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const fileType = file.type.startsWith('image/') ? 'image' : 
                      file.type.startsWith('video/') ? 'video' : 'document';
      
      const newItem: MediaItem = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: fileType,
        url: URL.createObjectURL(file),
        thumbnail: fileType === 'image' ? URL.createObjectURL(file) : undefined,
        size: file.size,
        uploadDate: new Date(),
        alt: '',
        tags: []
      };

      setMediaItems(prev => [newItem, ...prev]);
    });

    toast.success(`${files.length} bestand(en) succesvol geüpload`);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteItems = () => {
    if (selectedItems.length === 0) return;
    
    if (!confirm(`Weet je zeker dat je ${selectedItems.length} item(s) wilt verwijderen?`)) return;
    
    setMediaItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    toast.success(`${selectedItems.length} item(s) succesvol verwijderd`);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL gekopieerd naar klembord');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.alt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return ImageIcon;
      case 'video': return Video;
      case 'document': return FileText;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-2">Beheer alle afbeeldingen, video's en documenten</p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload Media
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <ImageIcon className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Afbeeldingen</p>
                <p className="text-2xl font-bold">{mediaItems.filter(item => item.type === 'image').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Video className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Video's</p>
                <p className="text-2xl font-bold">{mediaItems.filter(item => item.type === 'video').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Documenten</p>
                <p className="text-2xl font-bold">{mediaItems.filter(item => item.type === 'document').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Upload className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Totaal</p>
                <p className="text-2xl font-bold">{mediaItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Zoek media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="all">Alle Types</option>
                <option value="image">Afbeeldingen</option>
                <option value="video">Video's</option>
                <option value="document">Documenten</option>
              </select>

              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>

              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>

              {selectedItems.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteItems}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Verwijder ({selectedItems.length})
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredItems.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            return (
              <Card 
                key={item.id} 
                className={`cursor-pointer hover:shadow-lg transition-shadow ${
                  selectedItems.includes(item.id) ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => {
                  if (selectedItems.includes(item.id)) {
                    setSelectedItems(prev => prev.filter(id => id !== item.id));
                  } else {
                    setSelectedItems(prev => [...prev, item.id]);
                  }
                }}
              >
                <CardContent className="p-3">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 relative overflow-hidden">
                    {item.type === 'image' && item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <TypeIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-gray-600">{formatFileSize(item.size)}</p>
                    <p className="text-xs text-gray-500">
                      {item.uploadDate.toLocaleDateString('nl-NL')}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(item.url);
                        }}
                        className="p-1"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(item.url, '_blank');
                        }}
                        className="p-1"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredItems.map((item) => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <div 
                    key={item.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      selectedItems.includes(item.id) ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      if (selectedItems.includes(item.id)) {
                        setSelectedItems(prev => prev.filter(id => id !== item.id));
                      } else {
                        setSelectedItems(prev => [...prev, item.id]);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {item.type === 'image' && item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.alt}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <TypeIcon className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.alt || 'Geen beschrijving'}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                          <span className="text-xs text-gray-500">{formatFileSize(item.size)}</span>
                          <span className="text-xs text-gray-500">
                            {item.uploadDate.toLocaleDateString('nl-NL')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyUrl(item.url);
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(item.url, '_blank');
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Edit functionality
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Geen media gevonden</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedType !== 'all' 
                ? 'Geen media gevonden met de huidige filters.' 
                : 'Je hebt nog geen media geüpload.'}
            </p>
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Eerste Media Upload
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WordPressMediaLibrary;