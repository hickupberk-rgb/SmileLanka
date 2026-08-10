const STORAGE_KEYS = {
  user: 'smilelanka_user_profile',
  bookings: 'smilelanka_user_bookings',
  wishlist: 'smilelanka_user_wishlist',
};

export const createDefaultUserProfile = (user = {}) => ({
  id: user.id || 'guest-user',
  name: user.name || 'Traveler',
  email: user.email || 'traveler@example.com',
  phone: user.phone || '+94 77 000 0000',
  profileImage: user.profileImage || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'Traveler') + '&background=FBBF24&color=111827',
  password: user.password || '',
  bio: user.bio || 'Exploring the beauty of Sri Lanka, one journey at a time.',
  country: user.country || 'Sri Lanka',
  wishlist: Array.isArray(user.wishlist) ? user.wishlist : [],
  recentlyViewed: Array.isArray(user.recentlyViewed) ? user.recentlyViewed : [],
  reviews: Array.isArray(user.reviews) ? user.reviews : [],
  bookingHistory: Array.isArray(user.bookingHistory) ? user.bookingHistory : [],
});

export const getStoredUser = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEYS.user) || 'null');
    return parsed ? { ...createDefaultUserProfile(parsed), ...parsed } : createDefaultUserProfile();
  } catch (error) {
    return createDefaultUserProfile();
  }
};

export const saveStoredUser = (user) => {
  const normalized = createDefaultUserProfile(user);
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(normalized));
  return normalized;
};

export const getStoredBookings = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEYS.bookings) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

export const saveStoredBookings = (bookings) => {
  const normalized = Array.isArray(bookings) ? bookings : [];
  localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(normalized));
  return normalized;
};

export const getStoredWishlist = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishlist) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

export const saveStoredWishlist = (wishlist) => {
  const normalized = Array.isArray(wishlist) ? wishlist : [];
  localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(normalized));
  return normalized;
};
