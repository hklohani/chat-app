<?php

namespace App\Http\Controllers;

use App\Jobs\SendMessage;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $messages = collect(); // Initialize as an empty collection
        $recipientId = $request->get('recipient_id');

        if ($recipientId) {
            $messages = Message::with('sender:id,name', 'recipient:id,name')->where(function ($query) use ($recipientId) {
                $query->where('sender_id', Auth::id())
                    ->where('recipient_id', $recipientId);
            })->orWhere(function ($query) use ($recipientId) {
                $query->where('sender_id', $recipientId)
                    ->where('recipient_id', Auth::id());
            })->orderBy('created_at', 'asc')->get()
                ->map(function ($message) {
                    return [
                        'id' => $message->id,
                        'sender_id' => $message->sender_id,
                        'recipient_id' => $message->recipient_id,
                        'message' => $message->message,
                        'time' => $message->time,
                        'sender' => $message->sender,
                        'recipient' => $message->recipient,
                    ];
                });
        }

        $users = User::where('id', '!=', Auth::id())->get();

        return Inertia::render('Home', [
            'users' => $users,
            'messages' => $messages,
            'activeReceipentId' => $request->get('recipient_id'),
        ]);
    }

    public function messages(): JsonResponse
    {
        $messages = Message::with('user')->get()->append('time');

        return response()->json($messages);
    }

    public function message(Request $request)
    {
        $message = Message::create([
            'sender_id' => auth()->id(),
            'recipient_id' => $request->get('recipient_id'),
            'message' => $request->get('message'),
        ]);

        SendMessage::dispatch($message);

        return back();
    }
}
