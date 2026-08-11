<?php

use App\Http\Controllers\PortalController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortalController::class, 'index'])->name('home');
Route::get('/services', [PortalController::class, 'services'])->name('services');
Route::get('/directory', [PortalController::class, 'directory'])->name('directory');
Route::get('/faqs', [PortalController::class, 'faqs'])->name('faqs');
Route::get('/audit-suite', [PortalController::class, 'audit'])->name('audit');
