import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'languages',
    loadChildren: () => import('./modals/languages/languages.module').then( m => m.LanguagesPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modals/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'own-profile',
    loadChildren: () => import('./profile/own-profile/own-profile.module').then( m => m.OwnProfilePageModule)
  },
  {
    path: 'all-services',
    loadChildren: () => import('./all-services/all-services.module').then( m => m.AllServicesPageModule)
  },
  {
    path: 'themes',
    loadChildren: () => import('./modals/themes/themes.module').then( m => m.ThemesPageModule)
  },
  {
    path: 'one-services/:id',
    loadChildren: () => import('./one-services/one-services.module').then( m => m.OneServicesPageModule)
  },
  {
    path: 'favourite',
    loadChildren: () => import('./favourite/favourite.module').then( m => m.FavouritePageModule)
  },
  {
    path: 'view-profile/:id',
    loadChildren: () => import('./profile/view-profile/view-profile.module').then( m => m.ViewProfilePageModule)
  },
  // {
  //   path: 'chat-screen/:id',
  //   loadChildren: () => import('./chat-screen/chat-screen.module').then( m => m.ChatScreenPageModule)
  // },
  {
    path: 'chat-screen',
    loadChildren: () => import('./chat/chat-screen/chat-screen.module').then( m => m.ChatScreenPageModule)
  },
  {
    path: 'chats-page',
    loadChildren: () => import('./chat/chats-page/chats.module').then( m => m.ChatsPagePageModule)
  },
  {
    path: 'create-post',
    loadChildren: () => import('./post/create-post/create-post.module').then( m => m.CreatePostPageModule)
  },
  {
    path: 'my-posts',
    loadChildren: () => import('./post/my-posts/my-posts.module').then( m => m.MyPostsPageModule)
  },
  {
    path: 'view-post/:id',
    loadChildren: () => import('./post/view-post/view-post.module').then( m => m.ViewPostPageModule)
  },
  {
    path: 'image-preview',
    loadChildren: () => import('./modals/image-preview/image-preview.module').then( m => m.ImagePreviewPageModule)
  },
  {
    path: 'send-request',
    loadChildren: () => import('./post/send-request/send-request.module').then( m => m.SendRequestPageModule)
  },
  {
    path: 'view-request/:id',
    loadChildren: () => import('./post/view-request/view-request.module').then( m => m.ViewRequestPageModule)
  },
  {
    path: 'all-requests/:id',
    loadChildren: () => import('./post/all-requests/all-requests.module').then( m => m.AllRequestsPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./common/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./common/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
