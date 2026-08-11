<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PortalController extends Controller
{
    private function getServices()
    {
        return [
            [
                'id' => 'l-gov-1',
                'title' => 'Smart Citizen Identity Verification',
                'category' => 'Identity',
                'description' => 'Biometric smart ID validation, duplicate check, and instant digital certificate.',
                'icon' => 'pi pi-id-card',
            ],
            [
                'id' => 'l-gov-2',
                'title' => 'Digital Trade License & Tax Clearance',
                'category' => 'Commerce',
                'description' => 'Municipal e-trade license issuance with automated tax invoice generation.',
                'icon' => 'pi pi-briefcase',
            ],
            [
                'id' => 'l-gov-3',
                'title' => 'Social Security Elderly Stipend',
                'category' => 'Welfare',
                'description' => 'Direct allowance distribution for elderly, widow, and disabled citizens.',
                'icon' => 'pi pi-heart',
            ],
            [
                'id' => 'l-gov-4',
                'title' => 'Citizen Land Mutation & Khatian',
                'category' => 'Land Service',
                'description' => 'Online land record mutation application and digital Khatian copy download.',
                'icon' => 'pi pi-map',
            ],
        ];
    }

    private function getRecords()
    {
        return [
            [
                'id' => 'rec-101',
                'appNo' => 'LAR-2026-8001',
                'citizenName' => 'Mahmudul Hasan',
                'nidNumber' => '1984123456789012',
                'serviceTitle' => 'Smart Citizen Identity Verification',
                'district' => 'Dhaka',
                'status' => 'Approved',
                'date' => '2026-08-01',
            ],
            [
                'id' => 'rec-102',
                'appNo' => 'LAR-2026-8002',
                'citizenName' => 'Suraiya Parvin',
                'nidNumber' => '1993456789012345',
                'serviceTitle' => 'Digital Trade License & Tax Clearance',
                'district' => 'Chittagong',
                'status' => 'In Progress',
                'date' => '2026-08-02',
            ],
            [
                'id' => 'rec-103',
                'appNo' => 'LAR-2026-8003',
                'citizenName' => 'Anisur Rahman',
                'nidNumber' => '1976345678901234',
                'serviceTitle' => 'Social Security Elderly Stipend',
                'district' => 'Sylhet',
                'status' => 'Verified',
                'date' => '2026-08-03',
            ],
            [
                'id' => 'rec-104',
                'appNo' => 'LAR-2026-8004',
                'citizenName' => 'Farida Yasmin',
                'nidNumber' => '1999789012345678',
                'serviceTitle' => 'Citizen Land Mutation & Khatian',
                'district' => 'Khulna',
                'status' => 'Pending',
                'date' => '2026-08-04',
            ],
        ];
    }

    private function getFaqs()
    {
        return [
            [
                'id' => 'faq-1',
                'question' => 'What is AccessiService Laravel Portal?',
                'answer' => 'AccessiService is an accessible citizen e-services portal built with Laravel 12 & Blade templates to demonstrate backend web framework accessibility and test the AccessiMate widget.',
                'category' => 'General',
            ],
            [
                'id' => 'faq-2',
                'question' => 'How do I test AccessiMate in Laravel Blade?',
                'answer' => 'Click the floating AccessiMate icon at the bottom corner of your screen to test high contrast, text magnification, screen reader speech, and dyslexia replacement filters.',
                'category' => 'Accessibility',
            ],
            [
                'id' => 'faq-3',
                'question' => 'How do I track my Laravel application status?',
                'answer' => 'Enter your unique Reference Code (e.g. LAR-2026-8001) in the Directory & Lookup page.',
                'category' => 'Directory',
            ],
        ];
    }

    public function index()
    {
        $services = $this->getServices();

        return view('home', compact('services'));
    }

    public function services(Request $request)
    {
        $services = $this->getServices();
        $selectedId = $request->query('id', '');

        return view('services', compact('services', 'selectedId'));
    }

    public function directory(Request $request)
    {
        $search = $request->query('search', '');
        $records = $this->getRecords();

        if ($search) {
            $search = strtolower(trim($search));
            $records = array_filter($records, function ($r) use ($search) {
                return str_contains(strtolower($r['appNo']), $search) ||
                       str_contains(strtolower($r['citizenName']), $search) ||
                       str_contains($r['nidNumber'], $search) ||
                       str_contains(strtolower($r['serviceTitle']), $search);
            });
        }

        return view('directory', compact('records', 'search'));
    }

    public function faqs()
    {
        $faqs = $this->getFaqs();

        return view('faqs', compact('faqs'));
    }

    public function audit()
    {
        return view('audit');
    }
}
