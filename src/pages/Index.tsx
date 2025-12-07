import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const mockTracks = [
  { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', cover: '🌟', genre: 'Pop', mood: 'Energetic' },
  { id: 2, title: 'Shape of You', artist: 'Ed Sheeran', duration: '3:53', cover: '🎸', genre: 'Pop', mood: 'Happy' },
  { id: 3, title: 'Someone Like You', artist: 'Adele', duration: '4:45', cover: '🎹', genre: 'Soul', mood: 'Chill' },
  { id: 4, title: 'Circles', artist: 'Post Malone', duration: '3:35', cover: '⭕', genre: 'Pop', mood: 'Chill' },
  { id: 5, title: 'Bad Guy', artist: 'Billie Eilish', duration: '3:14', cover: '😈', genre: 'Alternative', mood: 'Energetic' },
  { id: 6, title: 'Levitating', artist: 'Dua Lipa', duration: '3:23', cover: '✨', genre: 'Pop', mood: 'Happy' },
  { id: 7, title: 'Watermelon Sugar', artist: 'Harry Styles', duration: '2:54', cover: '🍉', genre: 'Pop', mood: 'Happy' },
  { id: 8, title: 'Peaches', artist: 'Justin Bieber', duration: '3:18', cover: '🍑', genre: 'R&B', mood: 'Chill' },
  { id: 9, title: 'Save Your Tears', artist: 'The Weeknd', duration: '3:35', cover: '💧', genre: 'Pop', mood: 'Energetic' },
  { id: 10, title: 'drivers license', artist: 'Olivia Rodrigo', duration: '4:02', cover: '🚗', genre: 'Pop', mood: 'Chill' },
  { id: 11, title: 'Montero', artist: 'Lil Nas X', duration: '2:17', cover: '🦄', genre: 'Hip-Hop', mood: 'Energetic' },
  { id: 12, title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', duration: '2:21', cover: '🌙', genre: 'Pop', mood: 'Happy' },
];

const mockArtists = [
  { id: 1, name: 'The Weeknd', followers: '45.2M', avatar: '🎤', verified: true },
  { id: 2, name: 'Ed Sheeran', followers: '52.8M', avatar: '🎸', verified: true },
  { id: 3, name: 'Adele', followers: '38.6M', avatar: '🎹', verified: true },
  { id: 4, name: 'Post Malone', followers: '34.5M', avatar: '🎧', verified: true },
  { id: 5, name: 'Billie Eilish', followers: '42.1M', avatar: '💚', verified: true },
  { id: 6, name: 'Dua Lipa', followers: '36.7M', avatar: '💃', verified: true },
  { id: 7, name: 'Harry Styles', followers: '39.4M', avatar: '🌺', verified: true },
  { id: 8, name: 'Justin Bieber', followers: '58.3M', avatar: '🎵', verified: true },
  { id: 9, name: 'Olivia Rodrigo', followers: '28.9M', avatar: '🌟', verified: true },
  { id: 10, name: 'Lil Nas X', followers: '25.4M', avatar: '🦋', verified: true },
];

const mockPlaylists = [
  { id: 1, title: 'Вечерний Чилл', tracks: 42, cover: '🌃', description: 'Расслабляющие треки для вечера' },
  { id: 2, title: 'Утренний Заряд', tracks: 35, cover: '☀️', description: 'Энергия с утра' },
  { id: 3, title: 'Рабочий Фокус', tracks: 58, cover: '💼', description: 'Музыка для продуктивности' },
  { id: 4, title: 'Тренировка', tracks: 47, cover: '💪', description: 'Мощные биты для спорта' },
];

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'artists' | 'search' | 'playlists' | 'recommendations' | 'profile' | 'favorites'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(mockTracks[0]);
  const [progress, setProgress] = useState([33]);
  const [volume, setVolume] = useState([70]);

  const playTrack = (track: typeof mockTracks[0]) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const recommendations = mockTracks.filter(track => 
    track.mood === 'Chill' || track.mood === 'Happy'
  );

  const favorites = mockTracks.slice(0, 3);

  const filteredTracks = searchQuery 
    ? mockTracks.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockTracks;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            MusicFlow
          </h1>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <Button
            variant={currentView === 'home' ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
            onClick={() => setCurrentView('home')}
          >
            <Icon name="Home" size={20} />
            Главная
          </Button>
          <Button
            variant={currentView === 'search' ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
            onClick={() => setCurrentView('search')}
          >
            <Icon name="Search" size={20} />
            Поиск
          </Button>
          <Button
            variant={currentView === 'artists' ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
            onClick={() => setCurrentView('artists')}
          >
            <Icon name="Mic2" size={20} />
            Исполнители
          </Button>
          <Button
            variant={currentView === 'playlists' ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
            onClick={() => setCurrentView('playlists')}
          >
            <Icon name="ListMusic" size={20} />
            Плейлисты
          </Button>
          <Button
            variant={currentView === 'recommendations' ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
            onClick={() => setCurrentView('recommendations')}
          >
            <Icon name="Sparkles" size={20} />
            Рекомендации
          </Button>
          <Button
            variant={currentView === 'favorites' ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
            onClick={() => setCurrentView('favorites')}
          >
            <Icon name="Heart" size={20} />
            Избранное
          </Button>
          <Button
            variant={currentView === 'profile' ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
            onClick={() => setCurrentView('profile')}
          >
            <Icon name="User" size={20} />
            Профиль
          </Button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col pb-28">
        <div className="flex-1 overflow-y-auto p-8">
          {currentView === 'home' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold mb-2">С возвращением!</h2>
                <p className="text-muted-foreground">Вот что мы приготовили для вас сегодня</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Featured треки</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockTracks.slice(0, 3).map((track) => (
                    <Card 
                      key={track.id} 
                      className="glass-effect p-4 hover-scale cursor-pointer group"
                      onClick={() => playTrack(track)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl">
                          {track.cover}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{track.title}</h4>
                          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon name="Play" size={20} />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Популярные плейлисты</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockPlaylists.map((playlist) => (
                    <Card key={playlist.id} className="glass-effect p-4 hover-scale cursor-pointer">
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center text-5xl mb-3">
                        {playlist.cover}
                      </div>
                      <h4 className="font-semibold truncate">{playlist.title}</h4>
                      <p className="text-xs text-muted-foreground">{playlist.tracks} треков</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'search' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold mb-6">Поиск музыки</h2>
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Треки, исполнители, плейлисты..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {searchQuery ? `Результаты для "${searchQuery}"` : 'Все треки'}
                </h3>
                <div className="space-y-2">
                  {filteredTracks.map((track) => (
                    <Card 
                      key={track.id} 
                      className="glass-effect p-4 hover-scale cursor-pointer group"
                      onClick={() => playTrack(track)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl">
                          {track.cover}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{track.title}</h4>
                          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                        </div>
                        <Badge variant="secondary">{track.genre}</Badge>
                        <span className="text-sm text-muted-foreground">{track.duration}</span>
                        <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon name="Play" size={20} />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'artists' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold">Исполнители</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockArtists.map((artist) => (
                  <Card key={artist.id} className="glass-effect p-6 hover-scale cursor-pointer">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-3xl bg-gradient-to-br from-secondary to-accent">
                          {artist.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{artist.name}</h3>
                          {artist.verified && (
                            <Icon name="BadgeCheck" size={20} className="text-primary" />
                          )}
                        </div>
                        <p className="text-muted-foreground">{artist.followers} слушателей</p>
                      </div>
                      <Button variant="outline">Подписаться</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentView === 'playlists' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold">Плейлисты</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPlaylists.map((playlist) => (
                  <Card key={playlist.id} className="glass-effect p-6 hover-scale cursor-pointer">
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-6xl mb-4">
                      {playlist.cover}
                    </div>
                    <h3 className="text-lg font-bold mb-1">{playlist.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{playlist.description}</p>
                    <p className="text-xs text-muted-foreground">{playlist.tracks} треков</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentView === 'recommendations' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold mb-2">Умные рекомендации</h2>
                <p className="text-muted-foreground">На основе ваших предпочтений и истории прослушиваний</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Sparkles" size={24} className="text-primary" />
                  <h3 className="text-xl font-semibold">Идеально для вас</h3>
                </div>
                <div className="space-y-2">
                  {recommendations.map((track) => (
                    <Card 
                      key={track.id} 
                      className="glass-effect p-4 hover-scale cursor-pointer group"
                      onClick={() => playTrack(track)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl">
                          {track.cover}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{track.title}</h4>
                          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">{track.mood}</Badge>
                          <Badge variant="secondary">{track.genre}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{track.duration}</span>
                        <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon name="Play" size={20} />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'favorites' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3">
                <Icon name="Heart" size={32} className="text-secondary" />
                <h2 className="text-3xl font-bold">Избранное</h2>
              </div>
              <div className="space-y-2">
                {favorites.map((track) => (
                  <Card 
                    key={track.id} 
                    className="glass-effect p-4 hover-scale cursor-pointer group"
                    onClick={() => playTrack(track)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-xl">
                        {track.cover}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{track.title}</h4>
                        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                      </div>
                      <Badge variant="secondary">{track.genre}</Badge>
                      <span className="text-sm text-muted-foreground">{track.duration}</span>
                      <Button size="icon" variant="ghost">
                        <Icon name="Heart" size={20} className="fill-secondary text-secondary" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentView === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              <Card className="glass-effect p-8">
                <div className="flex items-start gap-6">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-5xl bg-gradient-to-br from-primary to-secondary">
                      🎵
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">Музыкальный меломан</h2>
                    <p className="text-muted-foreground mb-4">Слушаю музыку с 2024 года</p>
                    <div className="flex gap-6 mb-6">
                      <div>
                        <div className="text-2xl font-bold text-primary">156</div>
                        <div className="text-sm text-muted-foreground">Любимых треков</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">24</div>
                        <div className="text-sm text-muted-foreground">Плейлиста</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">12</div>
                        <div className="text-sm text-muted-foreground">Подписок</div>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-secondary">
                      Редактировать профиль
                    </Button>
                  </div>
                </div>
              </Card>

              <div>
                <h3 className="text-xl font-semibold mb-4">Недавно прослушано</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockTracks.slice(0, 4).map((track) => (
                    <Card key={track.id} className="glass-effect p-4 hover-scale cursor-pointer">
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl mb-3">
                        {track.cover}
                      </div>
                      <h4 className="font-semibold text-sm truncate">{track.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border p-4">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl animate-pulse-glow">
                  {currentTrack.cover}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{currentTrack.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
                </div>
                <Button size="icon" variant="ghost">
                  <Icon name="Heart" size={20} />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Icon name="Shuffle" size={20} />
                </Button>
                <Button size="icon" variant="ghost">
                  <Icon name="SkipBack" size={20} />
                </Button>
                <Button 
                  size="icon" 
                  className="w-12 h-12 bg-gradient-to-r from-primary to-secondary"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
                </Button>
                <Button size="icon" variant="ghost">
                  <Icon name="SkipForward" size={20} />
                </Button>
                <Button size="icon" variant="ghost">
                  <Icon name="Repeat" size={20} />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Icon name="Volume2" size={20} />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-24"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-10 text-right">1:32</span>
              <Slider
                value={progress}
                onValueChange={setProgress}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-10">{currentTrack.duration}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;