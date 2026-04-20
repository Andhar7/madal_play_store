// Translated from SwiftUI Data.swift
// All categories and website items for Sri Chinmoy app

export type CategoryId =
  | 'Favourite'
  | 'Main'
  | 'Library'
  | 'Races'
  | 'Centre'
  | 'Radio'
  | 'Videos'
  | 'Songs'
  | 'Peace Run'

export interface MenuItem {
  id: CategoryId
  icon: string // Ionicons icon name
}

export interface WebsiteItem {
  id: string
  category: CategoryId
  url: string
}

export const menuItems: MenuItem[] = [
  { id: 'Favourite', icon: 'star' },
  { id: 'Main', icon: 'home-outline' },
  { id: 'Library', icon: 'library-outline' },
  { id: 'Races', icon: 'walk-outline' },
  { id: 'Centre', icon: 'hand-right-outline' },
  { id: 'Radio', icon: 'radio-outline' },
  { id: 'Videos', icon: 'videocam-outline' },
  { id: 'Songs', icon: 'musical-notes-outline' },
  { id: 'Peace Run', icon: 'globe-outline' },
]

export const websiteItems: WebsiteItem[] = [
  // Main
  { id: 'Main', category: 'Main', url: 'https://srichinmoy.org' },
  { id: 'Sri Chinmoy About', category: 'Main', url: 'https://srichinmoy.org/sri_chinmoy' },
  { id: 'Spirituality', category: 'Main', url: 'https://srichinmoy.org/spirituality' },
  { id: 'Service', category: 'Main', url: 'https://srichinmoy.org/service' },
  { id: 'Resources', category: 'Main', url: 'https://srichinmoy.org/resources' },
  { id: 'Kind Words', category: 'Main', url: 'https://srichinmoy.org/kind_words' },

  // Library
  { id: 'Library Main', category: 'Library', url: 'https://www.srichinmoylibrary.com' },
  { id: 'All Books', category: 'Library', url: 'https://www.srichinmoylibrary.com/allbooks' },
  { id: 'About Sri Chinmoy', category: 'Library', url: 'https://www.srichinmoylibrary.com/srichinmoy' },
  { id: 'Covers', category: 'Library', url: 'https://www.srichinmoylibrary.com/allcovers' },

  // Races
  { id: 'Sri Chinmoy Races', category: 'Races', url: 'https://www.srichinmoyraces.org' },
  { id: 'About Us', category: 'Races', url: 'https://www.srichinmoyraces.org/about' },
  { id: 'Our Races', category: 'Races', url: 'https://www.srichinmoyraces.org/events' },
  { id: 'Results', category: 'Races', url: 'https://www.srichinmoyraces.org/results' },
  { id: '3100 Mile Race', category: 'Races', url: 'https://3100.srichinmoyraces.org' },

  // Centre
  { id: 'Sri Chinmoy Center', category: 'Centre', url: 'https://www.srichinmoycentre.org' },
  { id: 'About Centre', category: 'Centre', url: 'https://www.srichinmoycentre.org/sri_chinmoy_centre' },
  { id: 'Sri Chinmoy', category: 'Centre', url: 'https://www.srichinmoycentre.org/sri_chinmoy' },
  { id: 'Meditation', category: 'Centre', url: 'https://www.srichinmoycentre.org/meditation' },
  { id: 'Our members', category: 'Centre', url: 'https://www.srichinmoycentre.org/members' },
  { id: 'Latest news', category: 'Centre', url: 'https://www.srichinmoycentre.org/news' },

  // Radio
  { id: 'Sri Chinmoy Radio', category: 'Radio', url: 'https://www.radiosrichinmoy.org' },
  { id: 'About Radio', category: 'Radio', url: 'https://www.radiosrichinmoy.org/about/' },
  { id: 'Radio Sri Chinmoy', category: 'Radio', url: 'https://www.radiosrichinmoy.org/sri-chinmoy/' },
  { id: 'Meditation music', category: 'Radio', url: 'https://www.radiosrichinmoy.org/meditation-music/' },
  { id: 'Radio Latest releases', category: 'Radio', url: 'https://www.radiosrichinmoy.org/new-releases/' },

  // Videos
  { id: 'Over 700 videos', category: 'Videos', url: 'https://www.srichinmoy.tv' },
  { id: 'About this site', category: 'Videos', url: 'https://www.srichinmoy.tv/about/' },
  { id: 'Videos Sri Chinmoy', category: 'Videos', url: 'https://www.srichinmoy.tv/sri-chinmoy/' },
  { id: 'Videos Latest releases', category: 'Videos', url: 'https://www.srichinmoy.tv/new-releases/' },
  { id: 'Interviews', category: 'Videos', url: 'https://www.srichinmoy.tv/videos-disciples/' },

  // Songs
  { id: 'Sri Chinmoy Songs', category: 'Songs', url: 'https://www.srichinmoysongs.com' },
  { id: 'Songbooks', category: 'Songs', url: 'https://www.srichinmoysongs.com/books' },
  { id: 'Latest changes', category: 'Songs', url: 'https://www.srichinmoysongs.com/recent' },
  { id: 'All songs (21300)', category: 'Songs', url: 'https://www.srichinmoysongs.com/allsongs' },
  { id: 'Songs About Sri Chinmoy', category: 'Songs', url: 'https://www.srichinmoysongs.com/srichinmoy' },
  { id: 'Songs About this site', category: 'Songs', url: 'https://www.srichinmoysongs.com/about' },

  // Peace Run
  { id: 'Peace Run', category: 'Peace Run', url: 'https://www.peacerun.org' },
  { id: 'Peace Run About', category: 'Peace Run', url: 'https://www.peacerun.org/gb/about/' },
  { id: 'Media', category: 'Peace Run', url: 'https://www.peacerun.org/gb/media/' },
  { id: 'Friends', category: 'Peace Run', url: 'https://www.peacerun.org/gb/friends/' },
  { id: 'Torch-Bearer Award', category: 'Peace Run', url: 'https://www.peacerun.org/gb/torch-bearer-award/' },
  { id: 'Peace Run Song', category: 'Peace Run', url: 'https://www.peacerun.org/gb/peace-run-song/' },
  { id: 'Contact Us', category: 'Peace Run', url: 'https://www.peacerun.org/gb/contact-us/' },
]
