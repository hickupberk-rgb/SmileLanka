import {
  createDefaultUserProfile,
  getStoredUser,
  saveStoredUser,
  getStoredBookings,
  saveStoredBookings,
  getStoredWishlist,
  saveStoredWishlist,
} from './userAccountStorage';

describe('user account storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('creates a default profile from a user name', () => {
    const profile = createDefaultUserProfile({ name: 'Ava Brown', email: 'ava@example.com' });

    expect(profile.name).toBe('Ava Brown');
    expect(profile.email).toBe('ava@example.com');
    expect(profile.profileImage).toMatch(/https?:\/\//i);
    expect(profile.wishlist).toEqual([]);
    expect(profile.recentlyViewed).toEqual([]);
  });

  it('stores and restores user data from localStorage', () => {
    const user = createDefaultUserProfile({ name: 'Ava Brown', email: 'ava@example.com' });
    saveStoredUser(user);

    expect(getStoredUser()).toMatchObject({ name: 'Ava Brown', email: 'ava@example.com' });
  });

  it('stores booking and wishlist arrays safely', () => {
    const bookings = [{ id: 'b1', service: 'Beach Escape', date: '2026-09-12', status: 'Upcoming' }];
    const wishlist = [{ id: 'p1', name: 'Golden Experience' }];

    saveStoredBookings(bookings);
    saveStoredWishlist(wishlist);

    expect(getStoredBookings()).toEqual(bookings);
    expect(getStoredWishlist()).toEqual(wishlist);
  });
});
