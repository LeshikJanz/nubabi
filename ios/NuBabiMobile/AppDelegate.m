/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  [BuddyBuildSDK setup];

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"NuBabiMobile"
                                                      initialProperties:nil
                                                   launchOptions:launchOptions];

  self.rootView = rootView;

  self.defaultBackground = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  rootView.backgroundColor = self.defaultBackground;
  
  NSArray *allPngImageNames = [[NSBundle mainBundle] pathsForResourcesOfType:@"png" inDirectory:nil];
  for (NSString *imgName in allPngImageNames){
    if ([imgName containsString:@"LaunchImage"]){
      UIImage *img = [UIImage imageNamed:imgName];
      
      if (img.scale == [UIScreen mainScreen].scale
          && CGSizeEqualToSize(img.size, [UIScreen mainScreen].bounds.size)) {
        self.launchImageBackground = [UIColor colorWithPatternImage:img];
        rootView.backgroundColor = self.launchImageBackground;
      }
    }
  }

  [[NSNotificationCenter defaultCenter] addObserver:self
        selector:@selector(javascriptLoadEvent:) 
        name:@"RCTContentDidAppearNotification"
        object:nil];

  [[NSNotificationCenter defaultCenter] addObserver:self
        selector:@selector(javascriptLoadEvent:) 
        name:@"RCTJavaScriptWillStartLoadingNotification"
        object:nil];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (void) javascriptLoadEvent:(NSNotification *) notification
{
  if ([[notification name] isEqualToString:@"RCTContentDidAppearNotification"]) {
    self.rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    return;
  }

  if ([[notification name] isEqualToString:@"RCTJavaScriptWillStartLoadingNotification"] &&
      self.launchImageBackground
    ) {
    self.rootView.backgroundColor = self.launchImageBackground;
    return;
  }
}
@end
